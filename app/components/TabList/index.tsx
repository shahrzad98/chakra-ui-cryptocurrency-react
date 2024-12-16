import React from 'react';
import { TabList } from '@chakra-ui/react';

type PropTypes = {
  children: any;
  margin?: string;
  display?: string;
  background?: string;
  padding?: object;
  borderRadius?: object;
  height?: object;
};

const Hint = ({ children, margin, display, background, padding, borderRadius, height }: PropTypes) => {
  return (
    <TabList
      margin={margin}
      padding={padding}
      alignItems={'center'}
      height={height}
      background={background ? background : '#fff'}
      border="0"
      justifyContent={'center'}
      display={display ? display : 'flex'}
      borderRadius={borderRadius}
    >
      {children}
    </TabList>
  );
};

export default Hint;
