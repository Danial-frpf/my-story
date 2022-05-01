//
import mongoose from "mongoose";

//Creating mongoose schema
//A schema is formate that your message/document must follow
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String], //Array of strings
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//Converting schema into a model
const PostMessage = mongoose.model("PostMessage", postSchema);

//Exporting mongoose model
//Later on we will be able to perform several commands on this model like find, create, delete etc
export default PostMessage;
