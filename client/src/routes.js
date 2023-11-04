import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/Todo";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Login /> },

      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/task",
    element: <Todo />,
  },
];

export default routes;
