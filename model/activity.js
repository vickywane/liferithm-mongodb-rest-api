const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: Number,
  title: {
    type: String,
    min: [3, "use a remarkable name"],
    required: [
      true,
      "how would you recognize your activity without it's name?",
    ],
  },
  description: {
    type: String,
    min: [10, "add some details for your activity"],
    required: [true, "what is your activity about?"],
  },
  date: {
    type: String,
    required: true,
  },
  time: Array,
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Post", schema);
