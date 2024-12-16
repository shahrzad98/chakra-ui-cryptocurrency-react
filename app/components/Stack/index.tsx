import React from 'react';

import { Stack } from '@chakra-ui/react';

type PropTypes = {
  children: any[] | any;
  column?: string | number;
  otherProps?: any;
  gridTemplateAreas?: object;
};

const CustomStack = ({ children, column = 2, gridTemplateAreas, ...otherProps }: PropTypes) => {
  return (
    <Stack
      display="grid"
      gridTemplateColumns={{
        base: '1fr',
        lg: `repeat(${column}, 1fr)`,
      }}
      gridColumnGap="63px"
      gridRowGap="31px"
      alignItems="start"
      gridTemplateAreas={
        gridTemplateAreas
          ? gridTemplateAreas
          : {
              base: "'hint' 'form' 'box'",
              lg: "'form box''hint box'",
            }
      }
      gridTemplateRows="min-content 1fr"
      {...otherProps}
    >
      {children}
    </Stack>
  );
};

export default CustomStack;
