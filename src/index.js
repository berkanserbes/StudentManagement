require("dotenv").config();

const express = require("express");
const app = express();
const { createTables } = require("./config/db");

const studentRoute = require("./routes/studentRoute");
const departmentRoute = require("./routes/departmentRoute");
const emailRoute = require("./routes/emailRoute");
const studentCounterRoute = require("./routes/studentCounterRoute");

app.use(express.json()); // req.body'yi kullanabilmek için middleware tanımladık

app.use("/api/v1/students", studentRoute);
app.use("/api/v1/departments", departmentRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/v1/counter", studentCounterRoute);

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    await createTables();
  } catch (err) {
    console.log(err);
  }
};

init();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
