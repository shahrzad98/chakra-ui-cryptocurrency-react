import React from 'react';
import styled from 'styled-components';

const li = ({
  src,
  height,
  width,
  classname,
  margin,
  padding,
  display,
  text,
  color,
  lineHeight,
  fontSize,
}) => {
  const Li = styled.li`
    width: ${width};
    margin: ${margin};
    padding: ${padding};
    display: ${display};
    color: ${color};
    line-height: ${lineHeight};
    font-size: ${fontSize};
  `;

  return <Li className={classname}>{text}</Li>;
};
// img.propTypes = {};

export default li;
