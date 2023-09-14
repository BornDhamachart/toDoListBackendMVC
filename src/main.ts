import express, { Application, Request, Response,NextFunction } from "express";
import { AppRoutes, ProtectedAppRoutes } from "./routes";
import cors from "cors";
import { authenticationApiHandler } from "./toDoListAPI";

const app: Application = express();

app.use(cors());
app.use(express.json());

AppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, route.action);
});

ProtectedAppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, authenticationApiHandler, route.action);
});


app.get("/", (req, res) => {
  res.send("Test API");
});

app.listen(3100, () => {
  console.log("Server start on port 3100!");
});

module.exports = app;