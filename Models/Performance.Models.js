const mongoose = require("mongoose");

const PerformanceReview = new mongoose.Schema({
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    reviewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }],
    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback"
    }],
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("PerformanceReview", PerformanceReview);