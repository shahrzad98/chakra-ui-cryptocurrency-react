import React from "react"
import {
  Text,
  Flex,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'

type MessagePropTypes = {
  variant: "error" | "info";
  title: string;
  description: string,
  icon: JSX.Element;
}

const theme = {
  error: {
    background: "#fff1f1",
    color: "#dc2b2b",
  },
  info: {
    background: "#1650e9",
    color: "#fff",
  }
}

const Message = ({ title, description, variant, icon} : MessagePropTypes) => {
  const [display, setDisplay] = React.useState<"flex" | "none">("flex")
  const { color, background} = theme[variant]
  return (
    <Flex position="relative" color={color} background={background} display={display} direction={{base: "column", md: "row"}} gridGap={{base: "7px", md: "20px"}} alignItems={{base: "start", md: "center"}} padding={{base: "10px 24px", md: "30px 24px"}}>
      {icon}
      <Flex direction="column" gridGap={{base: "2px", md: "4px"}} flex="1">
        <Text color="inherit" fontFamily="yekanb" fontSize={{base: "14px", md: "18px"}}>{title}</Text>
        <Text color="inherit" fontFamily="yekan" fontSize={{base: "9px", md: "16px"}}>{description}</Text>
      </Flex>
      <CloseIcon position={{base: "absolute", md: "relative"}} top={{base: "10px", md: "unset"}} left={{base: "12px", md: "unset"}} width={{base: "10px", md: "20px"}} height={{base: "10px", md: "20px"}}  cursor="pointer" color="inherit" onClick={() => setDisplay("none")}/>
    </Flex>
  )
}

export default Message