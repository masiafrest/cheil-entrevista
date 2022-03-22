const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
});

commentSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
