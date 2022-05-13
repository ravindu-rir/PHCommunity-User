const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: true,
    },
    lName: {
        type: String,
        trim: true,
        required: true,
      },
    email: {
      type: String,
      trim: true,
      unique:[true, 'Email  is already exits'],
      required: [true, 'Please Enter Email'],
      lowercase: true,
    },
    country: {
        type: String,
        trim: true,
      },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    gpassword:{
      type: String,
      trim: true
    },
    AccountStatus: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: true }
);

mongoose.model("User",userSchema)