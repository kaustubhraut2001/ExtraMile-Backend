const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const Employee = require("../Models/Employees.Models");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.employee = await Employee.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    console.log(req?.employee);
    if (req?.employee?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware, isAdmin };
