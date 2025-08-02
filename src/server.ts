import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { router as aiRouter } from "./routes/ai.js";
import { globalErrorHandler, endpointNotImplemented } from "./middleware/errors.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// تكوين CORS للسماح بالوصول من جميع المنصات
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// تكوين Express
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// تكوين الأمان
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Health check endpoint
app.get('/api/health', (_, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/ai", aiRouter);

// Error handling
app.use(endpointNotImplemented);
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`AI Server running on port ${PORT}...`));
