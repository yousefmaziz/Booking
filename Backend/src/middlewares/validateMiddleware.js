import { z } from "zod";
export const validateMiddleware = (schema, target = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[target]);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues,
            });
        }
        if (target === "body") {
            req.body = result.data;
        }
        next();
    };
};
//# sourceMappingURL=validateMiddleware.js.map