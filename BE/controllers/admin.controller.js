const User = require("../models/user.model");

exports.createAdmin = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body, role: "admin" });
        res.status(200).json({
            status: "success",
            data: {
                name: user.name,
            },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({}).select("name title username role");
        res.status(200).json({
            status: "success",
            result: users.length,
            data: { users },
        });
    } catch (error) {}
};

exports.editUser = async (req, res, next) => {
    res.status(200).json({
        message: "chua lam",
    });
};

exports.deleteUser = async (req, res, next) => {
    res.status(200).json({
        message: "chua lam",
    });
};
