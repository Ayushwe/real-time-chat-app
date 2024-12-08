const express = require("express");
const router = express.Router();
const Conversation = require("../Models/conversation");
const Message = require("../Models/message");
const Auth = require("../middleware/Auth");

router.post("/send/:id", Auth, async (req, res) => {
  try {
    const { message } = req.body;
    const { id: ReceiverId } = req.params;
    const SenderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [SenderId, ReceiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [SenderId, ReceiverId],
      });
      await conversation.save();
    }

    const newMessage = new Message({
      senderId: SenderId,
      receiverId: ReceiverId,
      message,
    });
    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const { id: ChatUser } = req.params;
    const SenderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [SenderId, ChatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json([]);
    }

    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
