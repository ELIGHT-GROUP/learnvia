import { Request, Response, NextFunction } from "express";
import jwtUtil from "../utils/jwt.util";
import apiResponse from "../utils/apiResponse";
import { UserRole } from "../enums/user.roles";
import { createServiceLogger } from "../utils/logger.util";

const logger = createServiceLogger("AuthMiddleware");

interface AuthRequest extends Request {
  user?: { userId: string; role: UserRole };
}

const createAuthMiddleware = (allowedRoles: UserRole[] = []) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("No Authorization header or missing Bearer token", {
        ip: req.ip,
        path: req.path,
      });
      res.status(401).json(apiResponse.fail("No bearer token provided"));
      return;
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded: any = jwtUtil.verify(token);
      req.user = { userId: decoded.userId, role: decoded.role as UserRole };

      // If allowedRoles provided, check membership using enums
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(req.user.role)) {
          logger.warn("Forbidden: insufficient role", {
            userId: req.user.userId,
            required: allowedRoles,
            actual: req.user.role,
          });
          res
            .status(403)
            .json(apiResponse.fail("Forbidden: insufficient role"));
          return;
        }
      }

      next();
    } catch (err: any) {
      logger.warn("Invalid or expired token", { err: err?.message });
      res
        .status(401)
        .json(apiResponse.fail("Invalid or expired token", err?.message));
    }
  };
};

// Exported middleware is both callable as a factory and usable directly.
// If used directly by Express (authMiddleware(req,res,next)), the function
// will detect the call shape and act as middleware with no role restriction.
export function authMiddleware(...rolesOrReq: any[]): any {
  // Called as middleware directly: (req, res, next)
  if (
    rolesOrReq &&
    rolesOrReq.length === 3 &&
    rolesOrReq[0] &&
    rolesOrReq[0].headers
  ) {
    const [req, res, next] = rolesOrReq as [
      AuthRequest,
      Response,
      NextFunction
    ];
    return createAuthMiddleware()(req, res, next);
  }

  // Otherwise treat arguments as allowed roles and return middleware
  const roles = (rolesOrReq as UserRole[]) || [];
  return createAuthMiddleware(roles);
}

// Middleware to ensure users can only access their own data
export const ownDataMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.params.id;

  if (!req.user) {
    res.status(401).json(apiResponse.fail("Authentication required"));
    return;
  }
  if (req.user.userId !== userId) {
    res
      .status(403)
      .json(
        apiResponse.fail("Access denied. You can only access your own data.")
      );
    return;
  }

  next();
};
