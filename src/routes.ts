import {
  registerHandler,
  } from "./loginTemplateAPI";
  
  export const AppRoutes = [
  
    {
      path: "/register",
      method: "post",
      action: registerHandler,
    },
    // {
    //   path: "/postTest1",
    //   method: "post",
    //   action: register,
    // },
  ];