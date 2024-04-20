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
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }

}, {
    timestamps: true
});


module.exports = mongoose.model("Feedback", Feedback);