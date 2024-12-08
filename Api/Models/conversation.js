const mongoose = require("mongoose");
const user = require("./User");
const message = require("./message");

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: message,
        default:[],
      },
    ],
  },
  { timestamps: true }
);

const conversation = mongoose.model("conversation", conversationSchema);
module.exports = conversation;
