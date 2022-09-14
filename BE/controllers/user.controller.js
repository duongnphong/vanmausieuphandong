const User = require("../models/user.model");

exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId);
        res.status(200).json({
            status: "success",
            data: {
                username: user.username,
                password: user.password,
                name: user.name,
                docs: user.docs.length,
                favs: user.favourite.length,
            },
        });
    } catch (error) {}
};

exports.updateUser = async (req, res, next) => {
    try {
        const { userId, role } = req.user;
        const user = await User.findByIdAndUpdate(
            userId,
            { ...req.body, role: role },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            data: { user },
        });
    } catch (error) {}
};

exports.showFavourite = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { favourite } = await User.findById(userId).select("favourite");
        res.status(200).json({
            status: "success",
            data: { favourite },
        });
    } catch (error) {}
};

exports.updateFavourite = async (req, res, next) => {
    try {
    } catch (error) {}
    res.status(200).json({
        message: "chua lam",
    });
};

exports.showCollection = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const collection = await User.findById(userId)
            .select("docs")
            .populate("docs", "title content");
        res.status(200).json({
            status: "success",
            data: { collection },
        });
    } catch (error) {}
};
