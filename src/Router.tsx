import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { TaskPage } from "./pages/TaskPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoutes>
        <TaskPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
