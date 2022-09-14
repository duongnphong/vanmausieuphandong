const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Name must be required"],
        },
        title: {
            type: String,
            trim: true,
        },
        avatar: { type: String },
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Username must be required"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password must be required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        role: { type: String, required: [true, "Role must be required"] },
        favourite: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
        },
        docs: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
        },
        document: { type: Number },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
