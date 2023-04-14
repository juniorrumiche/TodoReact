import TimeAgo from "timeago-react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { MdCheckCircle, MdDelete } from "react-icons/md";
import { useTaskStore } from "../store/stores";
import { TaskType } from "../types/types";
import Cookies from "js-cookie";
import axios from "axios";
import { sleep } from "../api/functions";

const Task = ({ id, name, isCompleted, createdAt }: TaskType) => {
  const refresh = useTaskStore((state) => state.refreshing);
  const toast = useToast();

  const completedTask = async () => {
    const token = Cookies.get("token");
    try {
      await axios({
        url: "/api/v1/tasks/" + id,
        method: "PUT",
        data: { isCompleted: !isCompleted },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 403) {
          toast({
            description: "the token has expired",
            status: "error",
            isClosable: true,
          });
        }
      }
    }
  };

  // elimina la tarea
  const deleteTask = async () => {
    sleep(200);
    try {
      const token = Cookies.get("token");
      await axios({
        url: "/api/v1/tasks/" + id,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // tmuestra mensaje que se elimno
      toast({
        status: "error",
        description: "successfully removed",
        isClosable: true,
      });

      // refresca los datos
      refresh();
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="md">{name?.toUpperCase()}</Heading>
        <HStack spacing={2}>
          <IconButton
            borderRadius="2xl"
            size="md"
            onClick={async () => await deleteTask()}
            icon={<MdDelete />}
            aria-label="..."
          />

          <Text color={isCompleted ? " green.400" : ""}>
            <IconButton
              onClick={completedTask}
              borderRadius="2xl"
              size="md"
              icon={<MdCheckCircle />}
              aria-label="..."
            />
          </Text>
        </HStack>
      </Flex>
      <Text fontSize="sm" color="gray.500" mt={2}>
        <TimeAgo
          datetime={createdAt}
          locale="es_PE"
          opts={{ minInterval: 30 }}
        />
      </Text>
    </Box>
  );
};

export const TaskList = () => {
  const taskStore = useTaskStore((state) => state.tasks);
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");
  return (
    <Box w="full" h="75vh" p={4} overflow="scroll">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {taskStore &&
          taskStore.map((value, index) => (
            <GridItem p={3} borderRadius="lg" w="100%" bg={bg} key={index}>
              <Task {...value} />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};
