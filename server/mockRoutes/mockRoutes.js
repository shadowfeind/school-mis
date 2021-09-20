import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.route("/").get((req, res) => {
  const __dirname = path.resolve("./data/idhrmock.json");
  try {
    const content = fs.readFileSync(__dirname);
    const data = JSON.parse(content);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
