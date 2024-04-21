const router = require('express').Router();
const {
    createEmployee,
    getAllEmployees,
    LoginEmployee,
    addReview,
    getallFeedbacks,
    removeemployee,
    updateemployeesdetails,
    updatereview,
    getAllEmployeesWithFeedback,
    assigntoemployee,
    addreviewpreformace,
    getperformacereview,
    getEmployeeDetails
} = require("../Controllers/Employees.Controller");
const { authMiddleware, isAdmin } = require("../Middleware/auth");

router.post("/create", authMiddleware, createEmployee);
router.get("/getAll", authMiddleware, getAllEmployees);
router.post("/login", LoginEmployee);
router.post("/addReview", authMiddleware, addReview);
router.post("/getallemployeesfeedback", authMiddleware, isAdmin, getallFeedbacks);
router.post("/removeemployee", authMiddleware, isAdmin, removeemployee);
router.put("/updateemployeesdetails", authMiddleware, isAdmin, updateemployeesdetails);
router.put("/updateReview", authMiddleware, updatereview);
router.get("/getAllEmployeesWithFeedback", authMiddleware, isAdmin, getAllEmployeesWithFeedback);
router.post("/assigntoemployee", authMiddleware, isAdmin, assigntoemployee);
router.post("/addreviewpreformace", authMiddleware, addreviewpreformace);
router.get("/getperformacereview/:id", authMiddleware, getperformacereview);
router.get("/getemployeedetails/:id", authMiddleware, getEmployeeDetails);


module.exports = router;