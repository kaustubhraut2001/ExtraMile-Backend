const e = require("express");
const mongoose = require("mongoose");

const Employee = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        enum: ['admin', 'user'],
        type: String,
        default: 'user'
    },



}, {
    timestamps: true
});


exports.Employee = mongoose.model("Employee", Employee);