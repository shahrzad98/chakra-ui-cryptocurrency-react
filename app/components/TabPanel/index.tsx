import React from 'react';

import { Box, TabPanel } from '@chakra-ui/react';

type PropTypes = {
  children: any[] | any;
  otherProps?: object;
  borderTop?: boolean;
  style?: any;
};

const CustomTabPanel = ({ children, borderTop, style, ...otherProps }: PropTypes) => {
  return (
    <TabPanel
      style={style}
      padding={{
        base: '18px var(--chakra-space-4)',
        md: '28px 40px 30px 40px',
      }}
      background="#fff"
      {...otherProps}
    >
      {borderTop && (
        <Box
          borderTop="3px solid #f4f6fa"
          left="0"
          right="0"
          margin={{
            base: '0 var(--chakra-space-4)',
            md: '0 var(--chakra-space-14)',
          }}
          height="0px"
          position="absolute"
          top="-2px"
        />
      )}
      {children}
    </TabPanel>
  );
};

export default CustomTabPanel;
