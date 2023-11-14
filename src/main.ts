import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import groupRoutes from "./routes/group.route";
import labelRoutes from "./routes/label.route";
import subTaskRoutes from "./routes/subTask.route";
import taskRoutes from "./routes/task.route";
import userRoutes from "./routes/user.route";
import swaggerDocs from "./utils/swagger";
import log from "./utils/logger";
const app = express();
const port: number = 3100;

//Middleware
app.use(cors());
app.use(express.json())

//Routes
app.use("/", authRoutes);
app.use("/", groupRoutes);
app.use("/", labelRoutes);
app.use("/", subTaskRoutes);
app.use("/", taskRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

//Start Server
app.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
  swaggerDocs(app, port);
});

module.exports = app;
