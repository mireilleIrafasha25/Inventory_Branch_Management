import express from 'express';
import mongoose from 'mongoose';
import router from "./src/Routes/index.js";
import Configuration from "./src/Configs/index.js";
import errorHandler from './src/Middleware/ErrorHandler.js';

const app = express();

app.use(express.json());

app.use("/Inyange",router);
mongoose.connect(Configuration.db)
.then(()=>
{
    console.log("Connected to database");
})
.catch(err=>
{
    console.log(err);
})
app.listen(Configuration.port, () => {
    console.log("Server is running on port "+Configuration.port);
});
app.use(errorHandler)