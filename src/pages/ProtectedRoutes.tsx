import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { sleep } from "../api/functions";

interface ProtectedRouteProps {
  children?: ReactNode;
}
export const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get("token");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const token = Cookies.get("token");
        let response = await axios({
          url: "/api/v1/verify",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            toast({
              description: "your session has expired",
              status: "error",
              isClosable: true,
            });
          }
        }
        Cookies.remove("token");
        navigate("/login");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return token ? <>{children}</> : <Navigate to={"/login"} />;
};
