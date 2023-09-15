import express, { Application, Request, Response,NextFunction } from "express";
import { AppRoutes, ProtectedAppRoutes, ProtectedPermissionAppRoutes } from "./routes";
import cors from "cors";
import { authPermission, authToken } from "./toDoListAPI/middleware";


const app: Application = express();

app.use(cors());
app.use(express.json());

AppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, route.action);
});

ProtectedAppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, authToken, route.action);
});

ProtectedPermissionAppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, authToken, authPermission(["Admin"]), route.action);
});

app.get("/", (req, res) => {
  res.send("Test!!");
});

app.listen(3100, () => {
  console.log("Server start on port 3100!");
});

module.exports = app;