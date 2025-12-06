import express from "express";
import { apiLimiter, PORT } from "./config.js";
import { connectDB } from "./db/index.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./utils/errorHandler.js";
import helmet from 'helmet';
import authRoutes from "./routes/auth.js"
const app = express();
// Connect to Database
connectDB();
// Middleware
app.use(express.json());
app.use(logger);
app.use(apiLimiter);
app.use(helmet());

// Routes
app.use(authRoutes);
// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});
// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
