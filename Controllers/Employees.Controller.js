const bcrypt = require('bcryptjs');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const Employee = require('../Models/Employees.Models');
const jwt = require('jsonwebtoken');
const Feedback = require('../Models/Feedback.Models');


// create new Employee
const createEmployee = async(req, res) => {
    try {

        const { name, email, phone, password, } = req.body;
        console.log(req.body);
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });


        }
        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const employee = new Employee({ name, email, phone, password: hashedPassword });
        await employee.save();
        const token = jwt.sign({ id: employee._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: "Employee created successfully", employee, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login Employee
const LoginEmployee = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, employee.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: employee._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", employee, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all Employees
const getAllEmployees = async(req, res) => {
    try {
        const allemployees = await Employee.find();
        res.status(200).json({
            message: "Employees List",
            allemployees
        });
    } catch (error) {
        res.staus(500).json({ message: error.message });

    }
};


// Add review for other employees

const addReview = async(req, res) => {
    try {
        const { email, feedback, rating } = req.body;

        // Find the employee by email
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Create a new feedback object and associate it with the employee
        const newFeedback = new Feedback({
            employee: employee._id,
            feedback,
            rating
        });

        await newFeedback.save();

        res.status(201).json({ message: "Feedback added successfully", feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all Feedbacks for Employee

const getallFeedbacks = async(req, res) => {

    try {
        const { email } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const feedbacks = await Feedback.find({ employee: employee._id });
        res.status(200).json({ message: "Feedbacks List", feedbacks });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

module.exports = { createEmployee, LoginEmployee, getAllEmployees, addReview, getallFeedbacks };