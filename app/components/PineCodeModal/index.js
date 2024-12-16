/**
 *
 * PineCodeModal
 *
 */

import { Box } from "@chakra-ui/layout";
import React, { memo } from "react";
import Img from "../Img";
import P from "../P";
import Button from "../RabexButton";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PineCodeModal() {
  return (
    <>
      <Box
        w="100%"
        minHeight="200px"
        background="#fff"
        borderRadius="4px"
        boxShadow="xs"
        padding="30px 15px"
      >
        <Img
          height="100px"
          margin="0 auto"
          src={require("images/pincodewallet.svg")}
        />

        <P
          fontFamily="yekan"
          margin="30px auto 15px auto"
          text="پین کد کیف پول"
          fontSize="20px"
        />

        <P
          color="#767676"
          textAlign="right"
          text="پین کد ۴ رقمی کیف پول، برای ورود به کیف پول و مدیریت آن الزامی است"
        />

        <P
          color="#767676"
          textAlign="right"
          margin="10px 0 0 0"
          text="این پین کد به هیچ عنوان قابل بازیابی نیست و باید آن را بخاطر بسپارید"
        />

        <P
          color="#767676"
          textAlign="right"
          margin="10px 0 0 0"
          text="این پین کد را بر روی یک کاغذ یادداشت کرده و در جایی امن نگهداری کنید"
        />

        <Button
          margin="40px 0 0 0"
          padding="26px 100px"
          color="#fff"
          background="#1652f0"
        >
          قبول
        </Button>
      </Box>
    </>
  );
}

PineCodeModal.propTypes = {};

export default memo(PineCodeModal);
