import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{6,20}$)(?![_. ])(?!.*[_. ]{2})[a-zA-Z0-9._ ]+(?<![_. ])$/,
      "Username invalid, it should contain 6-20 alphanumeric letters, spaces, periods, or underscores, and be unique!",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    unique: [true, "Email already exists!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
