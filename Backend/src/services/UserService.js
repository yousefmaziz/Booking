import UserModel from "../models/userModel.js";
export const getAllUsersService = async () => {
    return await UserModel.find();
};
export const createUserService = async (userData) => {
    return await UserModel.create(userData);
};
export const getUserByEmailService = async (email) => {
    return await UserModel.findOne({ email });
};
//# sourceMappingURL=UserService.js.map