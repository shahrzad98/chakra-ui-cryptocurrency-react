import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../Img";
import Span from "../Span";

const TitleDiv = styled.div`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  position: relative;
  font-size: ${(props) => props.fontSize};
  border: 1pt solid #abacde;
  margin-top: 30px;
  padding: 30px;
  width: ${(props) => props.width};
`;

const TitleBar = ({
  children,
  background,
  color,
  icon,
  text,
  height,
  fontSize,
  padding,
  width,
  
}) => {
  return (
    <TitleDiv background={background} width={width}>
      <Img right="0" padding="0 10px 0 15px" height="30px" src={icon} />

      <Span fontSize={fontSize} color="white">
        {children}
      </Span>
      {/* This works only in rtl mode! */}
      <Img
        width="50"
        transform="rotate(15deg)"
        opacity="0.5"
        position="absolute"
        left="30px"
        height="auto"
        src={icon}
      />
    </TitleDiv>
  );
};

export default TitleBar;
