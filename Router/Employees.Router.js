const router = require('express').Router();
const {
    createEmployee,
    getAllEmployees,
    LoginEmployee,
    addReview,
    getallFeedbacks
} = require("../Controllers/Employees.Controller");

router.post("/create", createEmployee);
router.get("/getAll", getAllEmployees);
router.post("/login", LoginEmployee);
router.post("/addReview", addReview);
router.post("/getallemployeesfeedback", getallFeedbacks);

module.exports = router;