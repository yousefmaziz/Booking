import UserModel from "../models/userModel.js";

export const getAllUsersService = async () => {
  return await UserModel.find();
};

export const createUserService = async (userData: any) => {

  return await UserModel.create(userData);
};

export const getUserByEmailService = async (email: string) => {
  return await UserModel.findOne({ email });
};

