const router = require('express').Router();
const {
    createEmployee,
    getAllEmployees,
    LoginEmployee
} = require("../Controllers/Employees.Controller");

router.post("/create", createEmployee);
router.get("/getAll", getAllEmployees);
router.post("/login", LoginEmployee);

module.exports = router;