/**
 *
 * TextView
 *
 */
import { Input } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

// const Input = styled.input`
//   font-size: ${(props) => props.fontSize};
//   font-family: ${(props) => props.fontFamily};
//   color: ${(props) => props.color};
//   padding: ${(props) => props.padding};
//   width: ${(props) => props.width} !important;
//   height: ${(props) => props.height} !important;
//   border-radius: ${(props) => props.borderRadius} !important;
//   display: ${(props) => props.display} !important;
//   border: ${(props) => props.border} !important;
//   opacity: ${(props) => props.opacity};
//   direction: ${(props) => props.direction};
//   fontFamily: ${(props) => props.fontFamily};
//   text-align: ${(props) => props.textAlign};
//   background-color:${(props) => props.background}!important;
// `;

const RInput = (
  props,
  { borderRadius, display, direction, value, background },
) => {
  return (
    <Input
      direction={direction}
      border={props.border}
      fontFamily={props.fontFamily}
      onChange={e => {
        props.onInputChange ? props.onInputChange(e) : null;
      }}
      {...props}
    />
  );
};

export default RInput;
