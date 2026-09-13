import express from "express";

const app= express();

app.use(express.json());

app.get("/health",(req,res)=>{
    res.status(200).json({
        status: "OK",
        message: "ATS Resume Pipleline API is running"
    });
});

export default app;