import express from "express";
import cors from "cors";
import mockRoutes from "./mockRoutes/mockRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mock", mockRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
