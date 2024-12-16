import React from "react"
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

type PropTypes = {
  /**
   * The content of the component.
   */
  children: JSX.Element,
  /**
   * the title of component
   */
  title: string | JSX.Element,
  /**
   * if true, the drawer will be open.
   */
  isOpen: boolean,
  /**
   * Callback invoked to close the drawer.
   */
  onClose: () => void,
  /**
   * The placement of the component
   */
  placement?: "bottom" | "left" | "right" | "top",
  /**
   * the size of component
   */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl",
}

const CustomDrawer: React.FC<PropTypes> = ({
  title,
  isOpen,
  onClose,
  children,
  size = "lg",
  placement = "left",
}) => {
  return (
    <Drawer
      placement={placement}
      onClose={onClose}
      isOpen={isOpen}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          zIndex="1"
          display="grid"
          fontSize={{base: "13px", md: "15px"}}
          fontWeight="bold"
          alignItems="center"
          padding={{base: "12px 21px", md: "19px 30px"}}
          gridColumnGap="18px"
          gridTemplateColumns="32px 1fr"
          boxShadow="0 3px 6px 0 rgba(0, 0, 0, 0.06)"
        >
          <DrawerCloseButton
            top="0"
            right="0"
            fontSize={{base: "12px", md: "14px"}}
            position="relative"
            _focus={{
              boxShadow: "none"
            }}
          />
          {title}
        </DrawerHeader>
        <DrawerBody
          background="#f4f6fa"
          padding={{base: "12px", md: "19px 23px"}}
        >
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CustomDrawer