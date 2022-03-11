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
      required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
      },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("User", userSchema);