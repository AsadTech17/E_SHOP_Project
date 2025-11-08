const express = require("express");
const router = express.Router();
const path = require("path");
const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");

router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = {
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text || "",
      };

      if (req.files && req.files.length > 0) {
        messageData.images = req.files.map((file) => ({
          public_id: file.filename,
          url: file.path.replace(/\\/g, "/"),
        }));
      }

      const message = await Messages.create(messageData);

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

module.exports = router;
