const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  department: { type: String },
  salary: { type: Number },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const employeeModel = mongoose.model("employee", EmployeeSchema);

module.exports = employeeModel;
