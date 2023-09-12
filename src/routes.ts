import {
  authenticationHandler,
  createGroupHandler,
  createLabelHandler,
  createSubTaskHandler,
  createTaskHandler,
  getLabelHandler,
  getTaskHandler,
  loginHandler,
  registerHandler,
  } from "./toDoListAPI";
  
  export const AppRoutes = [
    {
      path: "/register",
      method: "post",
      action: registerHandler,
    },
    {
      path: "/login",
      method: "post",
      action: loginHandler,
    },
    {
      path: "/authentication",
      method: "post",
      action: authenticationHandler,
    },
    {
      path: "/createGroup",
      method: "post",
      action: createGroupHandler,
    },
    {
      path: "/createTask",
      method: "post",
      action: createTaskHandler,
    },
    {
      path: "/createSubTask",
      method: "post",
      action: createSubTaskHandler,
    },
    {
      path: "/createLabel",
      method: "post",
      action: createLabelHandler,
    },
    {
      path: "/getTask",
      method: "get",
      action: getTaskHandler,
    },
    {
      path: "/getLabel",
      method: "get",
      action: getLabelHandler,
    },
  ];