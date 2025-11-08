const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    sender: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messagesSchema);
