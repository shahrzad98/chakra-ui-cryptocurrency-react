import React, { useState, useEffect } from "react";

import { api } from "utils/network";
import { GetURL } from "../../../utils/urlMap";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  Img,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import RXNavLink from "components/RXNavLink";

const LoginMenu = () => {
  return (
    <Flex alignItems={"center"}>
      <Menu>
        <RXNavLink to="/auth/login">
          <FormattedMessage {...messages.login} />
        </RXNavLink>

        <RXNavLink to="/auth/register">
          <FormattedMessage {...messages.register} />
        </RXNavLink>
      </Menu>
    </Flex>
  );
};

export default LoginMenu;
