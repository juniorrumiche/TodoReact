import { Flex, IconButton, Select, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { MdOutlineExposurePlus1 } from "react-icons/md";
import { AddModalTask } from "../components/addTaskModal";
import { Bar } from "../components/bar";
import { TaskList } from "../components/TaskList";
import { useTaskStore } from "../store/stores";

export const TaskPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setTasks = useTaskStore((state) => state.setTasks);
  const refresh = useTaskStore((state) => state.refresh);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const token = Cookies.get("token");
      try {
        let response = await axios({
          method: "GET",
          url: "/api/v1/tasks",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data || []);
      } catch (error) {}
    });

    return () => clearTimeout(timeout);
  }, [refresh]);
  return (
    <>
      <Bar />

      <Flex w="full" justifyContent="space-between" p={5}>
        <IconButton
          onClick={onOpen}
          icon={<MdOutlineExposurePlus1 />}
          aria-label="..."
        />
        <Select w="30%">
          <option value="1">Completadas</option>
          <option value="0">No Completadas</option>
        </Select>
      </Flex>
      <AddModalTask isOpen={isOpen} onClose={onClose} />

      <TaskList />
    </>
  );
};
