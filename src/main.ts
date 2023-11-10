import express, { Application } from "express";
import { AppRoutes, ProtectedAppRoutes, ProtectedPermissionAppRoutes } from "./routes";
import cors from "cors";
import { authPermission, authToken } from "./toDoListAPI/middleware";
import  authRoutes  from "./routes/auth.route"
import swaggerDocs from "./utils/swagger";
import log from "./utils/logger";


const app = express();

const port : number = 3100;

app.use(cors());
app.use(express.json());

// AppRoutes.forEach((route) => {
//   app[route.method as keyof Application](route.path, route.action);
// });
app.use('/', authRoutes);

ProtectedAppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, authToken, route.action);
});

ProtectedPermissionAppRoutes.forEach((route) => {
  app[route.method as keyof Application](route.path, authToken, authPermission(["Admin"]), route.action);
});

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.listen(port, () => {
  log.info(`=================================`);
  log.info(`Server is running at http://localhost:${port}`);
  log.info(`=================================`);
  swaggerDocs(app, port);
});

module.exports = app;