import React from 'react';
import styled from 'styled-components';

const img = ({
  src,
  height,
  width,
  classname,
  margin,
  padding,
  display,
  float,
  position,
  left,
  right,
  transform,
  opacity,
  background,
  borderRadius,
}) => {
  const Img = styled.img`
    width: ${width};
    margin: ${margin};
    padding: ${padding};
    display: ${display};
    float: ${float};
    position: ${position};
    left: ${left};
    right: ${right};
    transform: ${transform};
    opacity: ${opacity};
    background: ${background};
    border-radius: ${borderRadius};
    height: ${height} !important;
  `;

  return <Img src={src} className={classname} width={width} alt="rabex" />;
};
// img.propTypes = {};

export default img;
