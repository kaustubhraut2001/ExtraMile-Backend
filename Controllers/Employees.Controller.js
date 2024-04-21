const bcrypt = require('bcryptjs');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const Employee = require('../Models/Employees.Models');
const jwt = require('jsonwebtoken');
const Feedback = require('../Models/Feedback.Models');
const PerformanceReview = require('../Models/Performance.Models');


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

        req.employee = employee;

        // req.user.role = employee.employee.role;
        const token = jwt.sign({ id: employee._id }, JWT_SECRET, { expiresIn: '6h' });
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
};


//remove employee
const removeemployee = async(req, res) => {
    try {
        const { email } = req.body;
        const employee = await Employee.findOneAndDelete({ email });
        console.log(employee, "employee")
        res.status(200).json({ message: "Employee deleted successfully", employees: employee });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }

};

//updateemployeedetails
const updateemployeesdetails = async(req, res) => {
    try {
        const { email, name, phone, password } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        if (name) {
            employee.name = name;
        }
        if (phone) {
            employee.phone = phone;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            employee.password = hashedPassword;
        }


        await employee.save();
        res.status(200).json({ message: "Employee details updated successfully", employee });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//update review
const updatereview = async(req, res) => {
    try {
        const { email, feedbackId, feedback, rating } = req.body;

        // Find the employee by email
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Find the feedback document by ID
        const feedbackDocument = await Feedback.findById(feedbackId);
        if (!feedbackDocument) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Update the feedback and rating fields
        if (feedback) {
            feedbackDocument.feedback = feedback;
        }
        if (rating) {
            feedbackDocument.rating = rating;
        }

        // Save the updated feedback document
        await feedbackDocument.save();

        res.status(200).json({ message: 'Feedback updated successfully', feedback: feedbackDocument });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all employess and theire specific feedback
const getAllEmployeesWithFeedback = async(req, res) => {
    try {
        const employees = await Employee.find();
        const employeesWithFeedback = await Promise.all(employees.map(async(employee) => {
            const feedbacks = await Feedback.find({ employee: employee._id });
            return {...employee._doc, feedbacks };
        }));
        res.status(200).json({ message: 'Employees with feedback', employeesWithFeedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// performace recview api
const assigntoemployee = async(req, res) => {
    try {
        const { reviewee, reviewers } = req.body;

        const employee = await Employee.findById(reviewee);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const performanceReview = new PerformanceReview({
            reviewee,
            reviewers,
            status: 'pending'
        });

        await performanceReview.save();

        res.status(201).json(performanceReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

};


// add the review employee
const addreviewpreformace = async(req, res) => {
    try {
        const { id } = req.params;
        const { feedback, rating } = req.body;

        const performanceReview = await PerformanceReview.findById(id);

        if (!performanceReview) {
            return res.status(404).json({ message: "Performance review not found" });
        }

        const newFeedback = new Feedback({
            employee: req.user.id,
            performanceReview: performanceReview._id,
            feedback,
            rating
        });

        await newFeedback.save();

        performanceReview.feedbacks.push(newFeedback);

        await performanceReview.save();

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    createEmployee,
    LoginEmployee,
    getAllEmployees,
    addReview,
    getallFeedbacks,
    removeemployee,
    updateemployeesdetails,
    updatereview,
    getAllEmployeesWithFeedback,
    assigntoemployee,
    addreviewpreformace
};