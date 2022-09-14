const Doc = require("../models/document.model");
const User = require("../models/user.model");

exports.getDocument = async (req, res, next) => {
    try {
        const { docId } = req.params;
        const doc = await Doc.findById(docId).populate("userId", "name title");
        res.status(200).json({
            status: "success",
            data: { doc },
        });
    } catch (error) {}
};

exports.getAllDocument = async (req, res, next) => {
    try {
        const docs = await Doc.find({}).populate("userId", "name title");
        res.status(200).json({
            status: "success",
            results: docs.length,
            data: { docs },
        });
    } catch (error) {}
};

exports.createDocument = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const doc = await Doc.create({ ...req.body, userId: userId });
        await User.findByIdAndUpdate(userId, { $push: { docs: doc._id } });
        res.status(200).json({
            status: "success",
            data: { doc },
        });
    } catch (error) {}
};

exports.editDocument = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { docId } = req.params;
        const doc = await Doc.findOneAndUpdate(
            { _id: docId, userId: userId },
            { ...req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            data: { doc },
        });
    } catch (error) {}
};

exports.deleteDocument = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { docId } = req.params;
        await Doc.findOneAndDelete({ _id: docId, userId: userId });
        await User.findByIdAndUpdate(userId, { $pull: { docs: docId } });
        res.status(200).json({
            status: "success",
            message: "Delete document successfully",
        });
    } catch (error) {}
};

const checkExistAndAdjust = (arr, item) => {
    return arr.includes(item)
        ? arr.filter((element) => element !== item)
        : [...arr, item];
};

exports.voteDocument = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { docId } = req.params;
        const { vote } = await Doc.findById(docId).select("vote");
        const doc = await Doc.findByIdAndUpdate(docId, {
            vote: checkExistAndAdjust(vote, userId),
        }).select("vote");
        res.status(200).json({
            status: "success",
            message: "vote successfully",
            data: { doc },
        });
    } catch (error) {}
};

exports.favouriteDocument = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { docId } = req.params;
        const { favourite } = await User.findById(userId).select("favourite");
        const user = await User.findByIdAndUpdate(userId, {
            favourite: checkExistAndAdjust(favourite, docId),
        }).select("favourite");
        res.status(200).json({
            status: "success",
            message: "chua lam",
            data: { user },
        });
    } catch (error) {}
};
