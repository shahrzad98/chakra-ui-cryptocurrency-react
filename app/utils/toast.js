import { useToast } from "@chakra-ui/react";
import React from "react";

const ToastError = ({ msg }) => {
  const toast = useToast();

  toast({
    title: msg,
    position: "bottom",
    isClosable: true,
  });
};

export { ToastError };
