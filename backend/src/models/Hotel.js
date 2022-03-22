const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  category: Number,
  price: Number,
  images: [String],
  comments: [
    {
      rating: Number,
      comment: String,
      user: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Comment",
    },
  ],
});

hotelSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
