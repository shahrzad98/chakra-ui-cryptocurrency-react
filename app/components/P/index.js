import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

const P = (props, { children }) => {
  // const Paragraf = styled.p`
  //   font-size: ${fontSize};
  //   font-family: ${fontFamily};
  //   color: ${color};
  //   line-height: ${lineHeight};
  //   padding: ${padding};
  //   display: ${display};
  //   margin: ${margin};
  //   text-align: ${textAlign};
  //   align-items: ${itemAlign};
  //   background: ${background};
  //   width: ${width};
  //   border: ${border};
  //   float:${float};
  // `;

  return (
    <Text {...props}>
      {props.text}
      {children}
    </Text>
  );
};

export default P;
