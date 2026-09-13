import app from "./app.js";
import pool from "./config/dataabase.js";

const PORT= 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

pool.query("SELECT NOW()",(err,result)=>{
    if(err){
        console.error("Database connection failed:", err.message);
    }else{
        console.log("Database connected:", result.rows[0]);
    }
});