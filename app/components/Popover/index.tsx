import React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Portal,
} from "@chakra-ui/react"

type PropTypes = {
  title: string,
  placement?: string | JSX.Element | undefined,
  trigger: JSX.Element,
  children: JSX.Element,

}

const CustomPopover: React.FC<PropTypes> = ({
  children,
  title,
  trigger,
  placement = "auto-start"
}) => {
  return (
    <Popover
      isLazy
      //@ts-ignore
      placement={placement}
      direction="rtl"
    >
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width="unset"
          border="0"
          borderRadius="0"
          boxShadow="0 0 11px 0 rgba(220, 194, 194, 0.72)"
          _focus={{
            boxShadow: "0 0 11px 0 rgba(220, 194, 194, 0.72)"
          }}
        >
          <PopoverArrow />
          <PopoverHeader
            dir="rtl"
            fontSize="16px"
            fontFamily="yekan, sans-serif"
            textAlign="center"
            borderBottom="0"
            padding="20px 0 0"
            color="#050f19"
          >
            {title}
          </PopoverHeader>
          <PopoverBody padding="20px 40px">
            {children}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )


}

export default CustomPopover