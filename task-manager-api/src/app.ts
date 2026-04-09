import express from "express";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
