import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { createServiceLogger } from "../utils/logger.util";

export class UsersController {
  private usersService = new UsersService();
  private logger = createServiceLogger("UsersController");

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const requestingUserId = (req as any).user.userId;

      this.logger.info("Get user request received", {
        userId,
        requestingUserId,
      });

      const user = await this.usersService.getUser(userId, requestingUserId);

      this.logger.info("User retrieved successfully", { userId });
      res.json(user);
    } catch (error: any) {
      this.logger.error("Get user failed", {
        error: error.message,
        userId: req.params.id,
      });

      res.status(error.message === "User not found" ? 404 : 500).json({
        statusCode: error.message === "User not found" ? 404 : 500,
        message: error.message,
      });
    }
  }

  async getUserVehicles(req: Request, res: Response): Promise<void> {
    // Deprecated in auth-only template
    res.status(410).json({ message: "Endpoint removed" });
  }

  async getUserBids(req: Request, res: Response): Promise<void> {
    // Deprecated in auth-only template
    res.status(410).json({ message: "Endpoint removed" });
  }
}
