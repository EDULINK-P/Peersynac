import express from "express";
import { PrismaClient } from "@prisma/client";


const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json({courses});
  } catch (error) {
    console.error("Error fetching courses", error);
    res.status(500).json({ message: "Failed to load courses" });
  }
});

export default router;
