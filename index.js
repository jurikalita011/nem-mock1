const express = require("express");
const connection = require("./db");
const userRoute = require("./routes/UserRoute");
const employeeRoute = require("./routes/EmployeeRoute");
const auth = require("./middlewares/auth");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/users", userRoute);
app.use(auth);
app.use("/employee", employeeRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
  console.log("running at port 7000");
});
