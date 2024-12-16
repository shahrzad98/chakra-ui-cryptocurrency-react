import React from 'react';

import { Tab } from '@chakra-ui/react';

type PropTypes = {
  children: any;
  otherProps?: any;
  width?: object;
  height?: object;
  borderRadius?: string;

  margin?: object;
  _selected?: {
    color?: string;
    borderColor?: string;
    boxShadow?: string;
    background?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    marginRight?: string;
    padding?: string;
    marginBottom?: string;
  };
};

const CostomTab = ({ children, margin, ...otherProps }: PropTypes) => {
  return (
    <Tab
      position="relative"
      zIndex="1"
      color="#b7c0ca"
      lineHeight={'31px'}
      margin={margin}
      _active={{
        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1)',
      }}
      _focus={{
        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1) !important',
      }}
      _selected={{
        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1)',
      }}
      fontSize={{
        base: '12px',
        md: '16px',
      }}
      // padding={{
      //   base: '0 15px 0 20px',
      //   md: '0 15px 0 20px',
      // }}
      borderBottom="1px solid #d6d9dc"
      {...otherProps}
    >
      {children}
    </Tab>
  );
};

export default CostomTab;
