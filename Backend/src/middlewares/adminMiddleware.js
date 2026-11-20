export const adminMiddleware = (req, res, next) => {
    const role = req.user.role;
    if (role !== "admin") {
        return res
            .status(403)
            .json({ message: "Cant Do That , You Are Not Admin" });
    }
    next();
};
//# sourceMappingURL=adminMiddleware.js.map