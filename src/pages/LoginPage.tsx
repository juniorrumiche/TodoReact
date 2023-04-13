import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  useColorMode,
  useColorModeValue,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
/*
 * ====================================================================*/
export const LoginPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(false);
  const formBackground = useColorModeValue("whiteAlpha.400", "whiteAlpha.100");

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
          name="username"
          placeholder="username"
          type="text"
          variant="filled"
          mb={3}
        />
        <Input
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
            setLoading(true);
            setLoading(false);
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
