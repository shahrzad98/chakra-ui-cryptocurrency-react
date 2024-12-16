/**
 *
 * TextView
 *
 */
import React, { useEffect } from "react";
import styled from "styled-components";

const Lbl = styled.label`
  width: ${(props) => props.width} !important;
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
`;

const Clabel = ({
  classname,
  width,
  textAlign,
  text,
  color,
  margin
}) => {
  return (
    <Lbl
      className={classname}
      width={width}
      textAlign={textAlign}
      color={color}
      margin={margin}
    >{text}</Lbl>
  );
};

export default Clabel;
