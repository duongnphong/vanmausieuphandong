const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: {
            type: String,
            trim: true,
            required: [true, "Title must be required"],
        },
        content: { type: String, trim: true },
        category: {
            type: Array,
            minItems: [1, "Category must includes at least 1 item"],
        },
        language: { type: String, enum: ["english", "vietnamese", "others"] },
        vote: { type: [{ type: String }] },
    },
    { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
