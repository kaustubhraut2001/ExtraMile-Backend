const mongoose = require("mongoose");

const Feedback = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }

}, {
    timestamps: true
});


exports.Feedback = mongoose.model("Feedback", Feedback);