import { createServiceLogger } from "../utils/logger.util";
import { UserModel, IUser } from "../models/User.model";
import { UserRole } from "../enums/user.roles";

export class UsersService {
  private logger = createServiceLogger("UsersService");
  async getUser(
    id: string,
    requestingUserId: string
  ): Promise<Partial<IUser> | null> {
    this.logger.info("Get user request", { userId: id, requestingUserId });

    const user = await UserModel.findById(id).select("-__v").lean().exec();

    if (!user) {
      this.logger.warn("User not found", { userId: id });
      throw new Error("User not found");
    }

    if (id !== requestingUserId) {
      this.logger.warn("Unauthorized access attempt", {
        userId: id,
        requestingUserId,
      });
      throw new Error("Unauthorized access");
    }

    this.logger.info("User retrieved successfully", { userId: id });
    return user as Partial<IUser>;
  }

  async getById(id: string): Promise<Partial<IUser> | null> {
    this.logger.info("Get user by id", { userId: id });
    const user = await UserModel.findById(id).select("-__v").lean().exec();
    if (!user) {
      this.logger.warn("User not found", { userId: id });
      throw new Error("User not found");
    }
    return user as Partial<IUser>;
  }

  async updateLastLoggedIn(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, {
        $set: { lastLoggedIn: new Date() },
      }).exec();
    } catch (error: any) {
      this.logger.warn("Failed to update lastLoggedIn", {
        userId: id,
        error: error.message,
      });
    }
  }

  // Offset-based pagination: page (1-based) and limit
  async getAll(
    page = 1,
    limit = 25
  ): Promise<{
    items: Partial<IUser>[];
    meta: { page: number; limit: number; total: number; totalPages: number };
  }> {
    this.logger.info("Get all users with pagination", { page, limit });

    const MAX_LIMIT = 100;
    const safeLimit = Math.min(Math.max(1, limit), MAX_LIMIT);
    const safePage = Math.max(1, page);
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      UserModel.find()
        .select("-__v")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean()
        .exec(),
      UserModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / safeLimit);

    return {
      items: items as Partial<IUser>[],
      meta: { page: safePage, limit: safeLimit, total, totalPages },
    };
  }

  async deleteUser(id: string, requestingUserId: string): Promise<void> {
    this.logger.info("Delete user request", { userId: id, requestingUserId });

    // Only owner/admins should call this from controller layer (route guarded)
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      this.logger.warn("User not found for deletion", { userId: id });
      throw new Error("User not found");
    }
  }

  async changeUserRole(id: string, newRole: string): Promise<Partial<IUser>> {
    this.logger.info("Change user role", { userId: id, newRole });

    const allowedRoles = Object.values(UserRole);
    if (!allowedRoles.includes(newRole as UserRole)) {
      this.logger.warn("Invalid role requested", { newRole });
      throw new Error("Invalid role");
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: { role: newRole } },
      { new: true }
    )
      .select("-__v")
      .lean()
      .exec();

    if (!user) {
      throw new Error("User not found");
    }
    return user as Partial<IUser>;
  }

  async updateUser(
    id: string,
    updates: Partial<IUser>,
    requestingUserId: string
  ): Promise<Partial<IUser>> {
    this.logger.info("Update user request", {
      userId: id,
      requestingUserId,
      updates,
    });

    if (id !== requestingUserId) {
      this.logger.warn("Unauthorized update attempt", {
        userId: id,
        requestingUserId,
      });
      throw new Error("Unauthorized access");
    }

    const allowed = { name: updates.name, picture: updates.picture } as any;

    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: allowed },
      { new: true }
    )
      .select("-__v")
      .lean()
      .exec();

    if (!user) {
      this.logger.warn("User not found on update", { userId: id });
      throw new Error("User not found");
    }

    return user as Partial<IUser>;
  }
}
