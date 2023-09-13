import {
  authenticationHandler,
  createGroupHandler,
  createLabelHandler,
  createSubTaskHandler,
  createTaskHandler,
  deleteGroupHandler,
  deleteLabelHandler,
  deleteSubTaskHandler,
  deleteTaskHandler,
  getLabelHandler,
  getTaskHandler,
  loginHandler,
  registerHandler,
  updateGroupHandler,
  updateLabelHandler,
  updateSubTaskHandler,
  updateTaskHandler,
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
    {
      path: "/deleteGroup",
      method: "post",
      action: deleteGroupHandler,
    },
    {
      path: "/deleteTask",
      method: "post",
      action: deleteTaskHandler,
    },
    {
      path: "/deleteSubTask",
      method: "get",
      action: deleteSubTaskHandler,
    },
    {
      path: "/deleteLabel",
      method: "post",
      action: deleteLabelHandler,
    },
    {
      path: "/updateGroup",
      method: "post",
      action: updateGroupHandler,
    },
    {
      path: "/updateTask",
      method: "post",
      action: updateTaskHandler,
    },
    {
      path: "/updateSubTask",
      method: "post",
      action: updateSubTaskHandler,
    },
    {
      path: "/updateLabel",
      method: "post",
      action: updateLabelHandler,
    },
  ];