import express from "express";
import jobRoutes from "./routes/job.routes.js";
import resumeRoutes from "./routes/resume.routes.js";

const app= express();

app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/jobs", resumeRoutes);

// app.get("/health",(req,res)=>{
//     res.status(200).json({
//         status: "OK",
//         message: "ATS Resume Pipleline API is running"
//     });
// });

export default app;