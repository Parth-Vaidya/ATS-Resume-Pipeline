import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// export default pool;
export const cheackDatabaseConnection = async() => {
    try{
        await pool.query("SELECT 1");
        console.log("Database connection successfull");
    }catch(error){
        console.error("Database connection failed: ",error.message);
    }
};


export default pool;