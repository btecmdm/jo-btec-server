import { Request, Response } from "express";
import { response } from "../utils/response.js";
import { AIService } from "../services/ai.service.js";

export class ChatController {
  private aiService = new AIService();

  handleChat = async (req: Request, res: Response) => {
    try {
      const { message, userId } = req.body;

      if (!message || !userId) {
        return res.status(400).json(
          response(undefined, new Error("Message and userId are required"))
        );
      }

      const aiResponse = await this.aiService.generateResponse(message);
      
      return res.json(response({
        response: aiResponse,
        agentType: this.aiService.determineAgentType(message),
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Chat error:", error);
      return res.status(500).json(
        response(undefined, new Error("Internal server error"))
      );
    }
  };
}
