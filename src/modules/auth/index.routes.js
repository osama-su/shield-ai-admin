import AuthLayout from "@/layouts/authLayout.vue";

import Login from "./pages/login.vue";

export default [
  {
    path: "/auth",
    component: AuthLayout,
    name: "auth",
    redirect: { name: "authLogin" },
    children: [
      {
        path: "login",
        component: Login,
        name: "authLogin",
      },
    ],
  },
];
