import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dto/user.dto";
import { getCollection } from "../database/db";
import { IUser } from "@/models/user.model";
import { generateToken } from "../middleware/auth.middleware";

class UserService {
  private get users() {
    return getCollection<IUser>("users");
  }

  async register(data: CreateUserDto) {
    const existingUser = await this.users.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser: IUser = {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role ?? "nurse",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.users.insertOne(newUser);
    newUser._id = result.insertedId;

    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    return { user: this.sanitizeUser(newUser), token };
  }

  async login(data: LoginUserDto) {
    const user = await this.users.findOne({ email: data.email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
      role: user.role,
    });

    return { user: this.sanitizeUser(user), token };
  }

  async getUser(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid user id");
    }
    const user = await this.users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new Error("User not found");
    }
    return this.sanitizeUser(user);
  }

  async updateUser(userId: string, data: UpdateUserDto) {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid user id");
    }
    const user = await this.users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!user) {
      throw new Error("User not found");
    }
    return this.sanitizeUser(user);
  }

  async deleteUser(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new Error("Invalid user id");
    }
    const result = await this.users.deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }
    return { message: "User deleted" };
  }

  private sanitizeUser(user: IUser) {
    const { password, _id, ...rest } = user;
    return { id: _id?.toString(), ...rest };
  }
}

export default new UserService();
