import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { loginAPI } from "../api/auth";
/*
 * ====================================================================*/
export const LoginPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formBackground = useColorModeValue("whiteAlpha.400", "whiteAlpha.100");

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  // login with api
  const loginAPI = async (username: string, password: string) => {
    try {
      // peticion
      const response = await axios.post(
        "/api/v1/auth",
        { username, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      //guarda la cookie
      Cookies.set("token", response.data.token, {
        path: "/",
        sameSite: "strict",
      });
      navigate("/");
    } catch (error) {
      // manejo de errores
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  };

  /*
   * ==================================================================== */
  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "dark" ? "gray.700" : "gray.100"}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        bg={formBackground}
        p={12}
        position="relative"
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="username"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          onChange={(e) => setPwd(e.target.value)}
          name="password"
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button
          isLoading={loading}
          loadingText={"Autorizando"}
          onClick={async () => {
            // setLoading(true);
            await loginAPI(username, pwd);
            // setLoading(false);
          }}
          colorScheme="teal"
          mb={8}
        >
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <IconButton
            onClick={toggleColorMode}
            position="fixed"
            top={5}
            right={5}
            icon={colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
            aria-label=".."
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};
