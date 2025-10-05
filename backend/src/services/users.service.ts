import { createServiceLogger } from "../utils/logger.util";
import { UserModel, IUser } from "../models/User.model";

export class UsersService {
  private logger = createServiceLogger("UsersService");

  async getUser(
    id: string,
    requestingUserId: string
  ): Promise<Partial<IUser> | null> {
    this.logger.info("Get user request", { userId: id, requestingUserId });

    const user = await UserModel.findById(id).select("-password").lean().exec();

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
}
