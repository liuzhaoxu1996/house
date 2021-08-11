import { lazy } from "react";

const routes: Array<RouteType> = [
  {
    path: "/home",
    name: "Home",
    component: lazy(() => import("../pages/Home")),
    auth: true
  },
  {
    path: "/center",
    name: "Center",
    component: lazy(() => import("../pages/Center")),
    auth: true
  }
];

export interface RouteType {
  path: string;
  name: string;
  component: any;
  auth?: boolean;
}

export default routes;
