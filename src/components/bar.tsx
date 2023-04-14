import {
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdLightbulb, MdLogout, MdNightlightRound } from "react-icons/md";

export const Bar = () => {
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex w="full" bg={bg} p={3} justifyContent="space-between">
      <Heading fontSize="2xl">TodoApp</Heading>
      <HStack spacing={3}>
        <IconButton
          onClick={toggleColorMode}
          rounded="3xl"
          icon={colorMode === "dark" ? <MdLightbulb /> : <MdNightlightRound />}
          aria-label="..."
        />
        <IconButton rounded="3xl" icon={<MdLogout />} aria-label="..." />
      </HStack>
    </Flex>
  );
};
