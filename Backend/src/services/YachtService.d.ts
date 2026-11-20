declare const createYachtService: (data: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/YachtModel.js").Yacht, {}, import("mongoose").DefaultSchemaOptions> & import("../models/YachtModel.js").Yacht & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
declare const getAllYachtsService: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/YachtModel.js").Yacht, {}, import("mongoose").DefaultSchemaOptions> & import("../models/YachtModel.js").Yacht & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
declare const getYachtByIdService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/YachtModel.js").Yacht, {}, import("mongoose").DefaultSchemaOptions> & import("../models/YachtModel.js").Yacht & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
declare const updateYachtService: (id: string, data: any) => Promise<(import("mongoose").Document<unknown, {}, import("../models/YachtModel.js").Yacht, {}, import("mongoose").DefaultSchemaOptions> & import("../models/YachtModel.js").Yacht & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
declare const deleteYachtService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/YachtModel.js").Yacht, {}, import("mongoose").DefaultSchemaOptions> & import("../models/YachtModel.js").Yacht & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export { createYachtService, getAllYachtsService, getYachtByIdService, updateYachtService, deleteYachtService, };
//# sourceMappingURL=YachtService.d.ts.map