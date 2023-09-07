import {
  authenticationHandler,
  loginHandler,
  registerHandler,
  } from "./loginTemplateAPI";
  
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
  ];