import React from "react";

// import PropTypes from 'prop-types';
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

const Span = ({
  children,
  text,
  fontSize,
  color,
  fontFamily,
  padding,
  margin,
  left,
  onChange,
}) => {
  const NSpan = styled.span`
    font-size: ${fontSize};
    font-family: ${fontFamily};
    color: ${color};
    padding: ${padding};
    margin: ${margin};
    left: ${left};
  `;

  return <NSpan>{children}</NSpan>;
};

export default Span;
