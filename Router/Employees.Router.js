const router = require('express').Router();
const {
    createEmployee,
    getAllEmployees,
    LoginEmployee,
    addReview,
    getallFeedbacks,
    removeemployee,
    updateemployeesdetails,
    updatereview
} = require("../Controllers/Employees.Controller");

router.post("/create", createEmployee);
router.get("/getAll", getAllEmployees);
router.post("/login", LoginEmployee);
router.post("/addReview", addReview);
router.post("/getallemployeesfeedback", getallFeedbacks);
router.post("/removeemployee", removeemployee);
router.put("/updateemployeesdetails", updateemployeesdetails);
router.put("/updateReview", updatereview);


module.exports = router;