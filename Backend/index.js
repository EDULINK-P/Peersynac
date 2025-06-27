import express from "express";
import cors from "cors";
import authRouter from "./Routes/auth.js";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EduLink is running");
});
app.use("/auth",authRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
