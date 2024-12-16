/**
 *
 * ShebaNumber
 *
 */
 import { Box, Flex, HStack } from "@chakra-ui/react";
 import Button from "../RabexButton";
 import React, { useEffect, useState,memo } from "react";
 import Input from "../Input";
import Img from '../Img';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ShebaNumber({onLoadSheba}) {
  const [form, setForm] = useState({
    sheba_number: "",
  });

  const handleTextChange = (e) => {
    if (e.length > 24) {
      e = e.slice(0, 24);
      setForm({ ...form, sheba_number: e })
    }
  };

  return (
    <>
    <HStack dir="rtl">
 
      <Box w="75%">
      <Button
          display="inline"
          background="#1652F0"
          margin="0 0 0 6px"
          fontSize="13px"
          borderRadius="4px"
          padding="10px"
          color="#fff"
          text='افزودن'
          onClick={(e) => {
            onLoadSheba(
                form.sheba_number
            );
          }}
          // img={require("images/pluse2.svg")}
        />
        <Input
          direction="ltr"
          border="1px solid #1652F0"
          textAlign="left"
          padding="6px 0"
          borderRadius="4px"
          w={"71%"}
          type="number"
          value={form.sheba_number}
          onInputChange={(event) => {
            setForm({ ...form, sheba_number: event.target.value });handleTextChange(event.target.value);
          }}
        />
      </Box>

      <Box w="25%" textAlign="right">
          <Flex>
          <Img background="#E2E8F0" width={"base"} padding="14px 8px" display="inline-block" src={require("images/IR.svg")} />
          <Img margin="0 5px 0 0" w={"base"} display="inline-block"  />
          </Flex>
      </Box>
    </HStack>
    </>
  );
}

ShebaNumber.propTypes = {};

export default memo(ShebaNumber);
