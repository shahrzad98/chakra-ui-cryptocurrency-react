import React from 'react';

import { Box } from '@chakra-ui/react';

type PropTypes = {
  /**
   * The content of the component.
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Shadow depth, It accepts values 0 and 1 inclusive.
   */
  elevation?: number | string;
  /**
   * If true, rounded corners are disabled.
   */
  square?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  styles?: object;
  width?: any;
  height?: any;
  gridRowGap?: any;
};

const shadows = {
  0: 'none',
  1: ' 0 0 6px 0 rgba(22, 82, 240, 0.2)',
};

const Paper: React.FC<PropTypes> = ({
  children,
  elevation = 0,
  square = false,
  styles = {},
  width,
  height,
  gridRowGap,
}) => {
  return (
    <Box
      w={width}
      h={height}
      boxShadow={shadows[elevation]}
      padding={{
        base: elevation ? '20px' : '0',
        md: elevation ? '17px 25px' : '0px',
      }}
      background="white"
      display="grid"
      gridRowGap={gridRowGap ? gridRowGap : '23px'}
      borderRadius={square ? '0px' : '3px'}
      {...styles}
    >
      {children}
    </Box>
  );
};

export default Paper;
