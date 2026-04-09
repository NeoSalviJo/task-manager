import express from "express";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);

// ⚠️ Error handler MUST be registered last — after all routes
app.use(errorHandler);

export default app;