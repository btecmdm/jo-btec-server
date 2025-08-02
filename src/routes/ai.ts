import express from "express";
import { ChatController } from "../controllers/chat.controller.js";

const router = express.Router();
const chatController = new ChatController();

router.post("/chat", chatController.handleChat);

export { router };
