// هنا التعامل مع الداتا بيز
import YachtModel from "../models/YachtModel.js";
const createYachtService = async (data) => {
    return await YachtModel.create(data);
};
const getAllYachtsService = async () => {
    return await YachtModel.find();
};
const getYachtByIdService = async (id) => {
    return await YachtModel.findById(id);
};
const updateYachtService = async (id, data) => {
    return await YachtModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
const deleteYachtService = async (id) => {
    return await YachtModel.findByIdAndDelete(id);
};
export { createYachtService, getAllYachtsService, getYachtByIdService, updateYachtService, deleteYachtService, };
//# sourceMappingURL=YachtService.js.map