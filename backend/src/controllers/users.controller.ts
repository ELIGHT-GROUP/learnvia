import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { createServiceLogger } from "../utils/logger.util";
import apiResponse from "../utils/apiResponse";

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
      res.json(apiResponse.success(user));
    } catch (error: any) {
      this.logger.error("Get user failed", {
        error: error.message,
        userId: req.params.id,
      });

      res
        .status(error.message === "User not found" ? 404 : 500)
        .json(apiResponse.fail(error.message));
    }
  }

  // GET /users/me
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      const requestingUserId = (req as any).user.userId;
      // Update lastLoggedIn timestamp since this endpoint indicates user activity
      await this.usersService.updateLastLoggedIn(requestingUserId);
      const user = await this.usersService.getById(requestingUserId);
      res.json(apiResponse.success(user));
    } catch (error: any) {
      res.status(500).json(apiResponse.fail(error.message));
    }
  }

  // GET /users (admin can list all users)
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt((req.query.page as string) || "1", 10);
      const limit = parseInt((req.query.limit as string) || "25", 10);
      const result = await this.usersService.getAll(page, limit);
      res.json(apiResponse.success(result));
    } catch (error: any) {
      res.status(500).json(apiResponse.fail(error.message));
    }
  }

  // PUT /users/:id
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const requestingUserId = (req as any).user.userId;
      const updates = req.body;

      const updated = await this.usersService.updateUser(
        userId,
        updates,
        requestingUserId
      );
      res.json(apiResponse.success(updated));
    } catch (error: any) {
      res.status(400).json(apiResponse.fail(error.message));
    }
  }

  // DELETE /users/:id
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const requestingUserId = (req as any).user.userId;
      await this.usersService.deleteUser(userId, requestingUserId);
      res.json(apiResponse.success({ message: "User deleted" }));
    } catch (error: any) {
      res.status(400).json(apiResponse.fail(error.message));
    }
  }

  // PUT /users/:id/role
  async changeUserRole(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const { role } = req.body;
      const updated = await this.usersService.changeUserRole(userId, role);
      res.json(apiResponse.success(updated));
    } catch (error: any) {
      res.status(400).json(apiResponse.fail(error.message));
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
