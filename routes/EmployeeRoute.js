const express = require("express");
const EmployeeModel = require("../models/EmployeeModel");

const employeeRoute = express.Router();

employeeRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const employee = await EmployeeModel.create({
      ...payload,
      creator: req.userId,
    });
    await employee.populate("creator");
    return res
      .status(200)
      .send({ msg: "new employee has been added", employee: employee });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "unable to add new employee", error: error.message });
  }
});

employeeRoute.patch("/edit/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    if (employee.creator.toString() !== req.userId) {
      res.send({ msg: "you not authorized" });
    } else {
      const upDatedEmployee = await EmployeeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.send({
        msg: "employee data has been updated",
        newData: upDatedEmployee,
      });
    }
  } catch (error) {
    res.send({ msg: "unable to update data", error: error.message });
  }
});

employeeRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeModel.findOne({ _id: id });
    if (req.body.userId === employee.userId) {
      await EmployeeModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "employee data has been deleted" });
    } else {
      res.status(201).send({ msg: "You cannot delete data" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "unable to delete data", error: error.message });
  }
});

employeeRoute.get("/data/:department", async (req, res) => {
  const { department } = req.body;
  let q = department;
  try {
    const employee = await EmployeeModel.find(q);
    res.status(200).send({ msg: "found employee by dept", employee: employee });
  } catch (error) {
    res.status(400).send({ msg: "cannot find employee by dept" });
  }
});

employeeRoute.get("/", async (req, res) => {
  try {
    const employee = await EmployeeModel.find();
    res
      .status(200)
      .send({ msg: "found all employee data", employee: employee });
  } catch (error) {
    res.status(400).send({ msg: "cannot find any employee data" });
  }
});

employeeRoute.get("/q", async (req, res) => {
  try {
    const employee = await EmployeeModel.find(req.query);
    res
      .status(200)
      .send({ msg: "found all employee data", employee: employee });
  } catch (error) {
    res.status(400).send({ msg: "cannot find any employee data" });
  }
});

employeeRoute.get("/sortAsc", async (req, res) => {
  try {
    const employee = await EmployeeModel.find().sort({ salary: 1 });
    res
      .status(200)
      .send({ msg: "found all asc sorted data", employee: employee });
  } catch (error) {
    res.status(400).send({ msg: "cannot find asc any sorted employee data" });
  }
});

employeeRoute.get("/sortDesc", async (req, res) => {
  try {
    const employee = await EmployeeModel.find().sort({ salary: -1 });
    res
      .status(200)
      .send({ msg: "found all desc sorted data", employee: employee });
  } catch (error) {
    res.status(400).send({ msg: "cannot find any desc sorted employee data" });
  }
});

/*
{
    "firstName":"jjj",
    "lastName":"kkk",
    "email":"jk@gmail.com",
    "department":"Tech",
    "salary":50000
}
*/

module.exports = employeeRoute;
