//Importing main  dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

//Importing router
import postRouter from "./routes/posts.js";

//Initializing express app instance
const app = express();

//Using express middle ware to connect router with application
//We added a prefix "/posts" for all routes
app.use("/posts", postRouter);

//Setting up body-parser to properly send request
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Setting cors for usage
app.use(cors());

//Creating connection to mongodb by copying the link got from "connect application" and providing username and password of the created user in placeholders
const CONNECTION_URL =
  "mongodb+srv://danialfrpf:2ndratemongodbuser@cluster0.kcysz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Later on we are going to change this
const PORT = process.env.PORT || 5000;

//Finally we use mongoose to connect to data base needs URL and some optional options to avoid errors in consol
//Removed options as they are no longer necessary
//Because its a promise we need to pass then that will run the passed function on success else we wil console the error using catch
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//Making sure not to get any warnings in console
//mongoose.set("useFindAndModify", false);
//The above line is no longer necessary
