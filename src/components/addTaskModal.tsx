import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { sleep } from "../api/functions";
import { useTaskStore } from "../store/stores";

interface addModalTaskProps {
  isOpen: boolean;
  onClose: any;
}

export const AddModalTask = ({ isOpen, onClose }: addModalTaskProps) => {
  const initialRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const refresh = useTaskStore((state) => state.refreshing);
  const toast = useToast();
  const [name, setName] = useState("");

  const saveTask = async () => {
    sleep(200);
    const token = Cookies.get("token");
    try {
      await axios({
        method: "POST",
        url: "/api/v1/tasks/add",
        data: { name },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        description: "successfully added",
        status: "success",
        isClosable: true,
      });
      onClose();
      refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 401) {
          toast({
            description: "the token has expired",
            status: "error",
            isClosable: true,
          });
        }
      }

      // console.log(error);
    }
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name Task</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                ref={initialRef}
                placeholder="Task name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={async () => {
                setLoading(true);
                await saveTask();
                setLoading(false);
              }}
              colorScheme="teal"
              mr={3}
            >
              Guardar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
