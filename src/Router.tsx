import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { TaskPage } from "./pages/TaskPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <TaskPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
