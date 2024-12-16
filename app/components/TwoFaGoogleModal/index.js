/**
 *
 * TowfaGoogleModal
 *
 */
import P from "../P";

import React, { memo } from "react";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import RabexButton from "../RabexButton";
import messages from '../../containers/User/messages';
import { FormattedMessage } from "react-intl";

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TwoFaModalGoogleStepper from "../TwoFaModalGoogleStepper";
import { propNames } from "@chakra-ui/styled-system";

function TwoFaGoogleModal(props) {

  return (
    <Stack
      bg="#fff"
      w={{ base: "100%", md: "35%", lg: "35%", xl: "35%" }}
      margin="0 auto"
      boxShadow="md"
      borderRadius="4px"
    >
      <Box bg="black" color="white">
    
    </Box>
      <P padding="15px 0 10px 0" text={<FormattedMessage {...messages.Google2FaActive} />} />

      <Box textAlign="center" w="100%">
        <Box
          margin="0 auto"
          w="80px"
          margin="0 auto 20px auto"
          borderTop="2px solid #788CA6"
        />
      </Box>
      <TwoFaModalGoogleStepper  secrets={props.secrets} />
    </Stack>
  );
}

TwoFaGoogleModal.propTypes = {};

export default memo(TwoFaGoogleModal);
