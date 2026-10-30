// هنا التعامل مع الداتا بيز
import YachtModel from "../models/YachtModel.js";

const createYachtService = async (data: any) => {
  return await YachtModel.create(data);
};

const getAllYachtsService = async () => {
  return await YachtModel.find();
};

const getYachtByIdService = async (id: string) => {
  return await YachtModel.findById(id);
};

const updateYachtService = async (id: string, data: any) => {
  return await YachtModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteYachtService = async (id: string) => {
  return await YachtModel.findByIdAndDelete(id);
};

export {
  createYachtService,
  getAllYachtsService,
  getYachtByIdService,
  updateYachtService,
  deleteYachtService,
};
