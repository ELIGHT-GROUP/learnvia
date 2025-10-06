import { createServiceLogger } from "../utils/logger.util";
import { UserModel, IUser } from "../models/User.model";

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

  async getAll(): Promise<Partial<IUser>[]> {
    this.logger.info("Get all users");
    const users = await UserModel.find().select("-__v").lean().exec();
    return users as Partial<IUser>[];
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
