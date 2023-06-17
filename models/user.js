import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    unique: [true, "Email already exists!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  image: {
    type: String,
  },
});


const User = models.User || model("User", UserSchema);

export default User;