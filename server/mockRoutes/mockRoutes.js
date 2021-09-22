import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.route("/schoolSettings").get((req, res) => {
  const __dirname = path.resolve("./data/idhrmock.json");
  try {
    const content = fs.readFileSync(__dirname);
    const data = JSON.parse(content);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.route("/position").get((req, res) => {
  const __dirname = path.resolve("./data/hrPosition.json");
  try {
    const content = fs.readFileSync(__dirname);
    const data = JSON.parse(content);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.route("/employeeType").get((req, res) => {
  const __dirname = path.resolve("./data/hrEmployeeType.json");
  try {
    const content = fs.readFileSync(__dirname);
    const data = JSON.parse(content);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.route("/employeeCategoryRole").get((req, res) => {
  const __dirname = path.resolve("./data/hrEmployeeCategoryRole.json");
  try {
    const content = fs.readFileSync(__dirname);
    const data = JSON.parse(content);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
