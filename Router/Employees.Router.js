const router = require('express').Router();
const {
    createEmployee,
    getAllEmployees,
    LoginEmployee,
    addReview,
    getallFeedbacks,
    removeemployee,
    updateemployeesdetails
} = require("../Controllers/Employees.Controller");

router.post("/create", createEmployee);
router.get("/getAll", getAllEmployees);
router.post("/login", LoginEmployee);
router.post("/addReview", addReview);
router.post("/getallemployeesfeedback", getallFeedbacks);
router.post("/removeemployee", removeemployee);
router.put("/updateemployeesdetails", updateemployeesdetails);
router.put("/updateReview", updateReview);


module.exports = router;