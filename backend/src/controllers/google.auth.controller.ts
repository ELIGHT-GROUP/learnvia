import { Request, Response } from "express";
import { GoogleAuthService } from "../services/google.auth.service";
import { createServiceLogger } from "../utils/logger.util";
import apiResponse from "../utils/apiResponse";
import crypto from "crypto";
import jwtUtil from "../utils/jwt.util";
import { BadRequestError } from "../errors/HttpError";

export class GoogleAuthController {
  private googleAuthService = new GoogleAuthService();
  private logger = createServiceLogger("GoogleAuthController");

  // GET /api/v1/auth/google
  initiateGoogleAuth(req: Request, res: Response) {
    // clientRedirect is where we should send the user after successful auth (frontend or mobile deep link)
    const clientRedirect =
      (req.query.redirect_uri as string) || process.env.FRONTEND_ORIGIN;
    // Validate clientRedirect against whitelist
    const whitelist = (process.env.CLIENT_REDIRECT_WHITELIST || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (
      whitelist.length > 0 &&
      (!clientRedirect || !whitelist.includes(clientRedirect))
    ) {
      this.logger.warn(`Rejected client redirect_uri: ${clientRedirect}`);
      throw new BadRequestError("Invalid redirect_uri");
    }

    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const scope = encodeURIComponent("openid email profile");

    // Sign a state token containing nonce and the client redirectUri (short lived)
    const nonce = crypto.randomBytes(16).toString("hex");
    const stateToken = jwtUtil.sign({ nonce, redirectUri: clientRedirect });

    // Use the backend callback (GOOGLE_REDIRECT_URI) as the redirect_uri parameter sent to Google
    const googleRedirect = process.env.GOOGLE_REDIRECT_URI!;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      googleRedirect
    )}&scope=${scope}&state=${encodeURIComponent(
      stateToken
    )}&access_type=offline&prompt=consent`;

    res.redirect(authUrl);
  }

  // GET /api/v1/auth/google/callback
  async googleCallback(req: Request, res: Response): Promise<void> {
    const { code, state } = req.query as any;
    this.logger.debug(`Callback received state present: ${Boolean(state)}`);

    if (!code) throw new BadRequestError("Missing authorization code");
    if (!state) throw new BadRequestError("Missing state");

    // Verify signed state token and extract redirectUri
    let decodedState: any;
    try {
      decodedState = jwtUtil.verify(state as string);
    } catch (err) {
      this.logger.warn("Invalid or expired state token");
      throw new BadRequestError("Invalid or expired state");
    }
    const redirectUri = decodedState.redirectUri as string | undefined;
    if (!redirectUri) throw new BadRequestError("Invalid state payload");

    // Exchange code for tokens
    const tokens = await this.googleAuthService.exchangeCodeForTokens(
      code as string
    );
    // Verify id_token and get user info
    const googleUser = await this.googleAuthService.verifyGoogleToken(
      tokens.idToken
    );

    if (!googleUser.email_verified)
      throw new BadRequestError("Google email not verified");

    // Find or create user
    const result = await this.googleAuthService.createOrUpdateUserFromGoogle(
      googleUser
    );

    // Issue application JWT (short lived)
    const appToken = jwtUtil.sign({
      userId: result.user.id,
      role: result.user.role,
    });

    // Redirect back to client with token in fragment (so it's not sent to server)
    // Use the redirectUri provided in the signed state
    const target = `${redirectUri}#access_token=${encodeURIComponent(
      appToken
    )}&token_type=Bearer&state=${encodeURIComponent(state as string)}`;
    res.redirect(target);
  }
}
