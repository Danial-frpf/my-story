//Importing main  dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//Importing router
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

//Initializing express app instance
const app = express();
dotenv.config();

//Setting up body-parser to properly send request
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Setting cors for usage
//Cors should be initiated before router
app.use(cors());

//Using express middle ware to connect router with application
//We added a prefix "/posts" for all routes
app.use("/posts", postRoutes);

//Auth Routes
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
});

//Creating connection to mongodb by copying the link got from "connect application" and providing username and password of the created user in placeholders
//It is now in .env file
//Later on we are going to change this
const PORT = process.env.PORT || 5000;

//Finally we use mongoose to connect to data base needs URL and some optional options to avoid errors in consol
//Removed options as they are no longer necessary
//Because its a promise we need to pass then that will run the passed function on success else we wil console the error using catch
mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));

//Making sure not to get any warnings in console
//mongoose.set("useFindAndModify", false);
//The above line is no longer necessary
