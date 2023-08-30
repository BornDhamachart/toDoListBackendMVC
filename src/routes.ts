import {
    getTest1,
    // postTest1,
  } from "./test1API";
  
  export const AppRoutes = [
  
    {
      path: "/getTest1",
      method: "get",
      action: getTest1,
    },
    // {
    //   path: "/postTest1",
    //   method: "post",
    //   action: postTest1,
    // },
  ];