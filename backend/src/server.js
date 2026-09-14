import app from "./app.js";
import { cheackDatabaseConnection } from "./config/database.js";

const PORT= 5000;

app.listen(PORT , async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

    await cheackDatabaseConnection();
})
