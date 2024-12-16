import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

type Props = {
  colorScheme?: string;
  className?: string;
  margin?: string | number;
};

const RXMain: React.FC<Props> = ({ children, colorScheme, className, margin }) => {
  return (
    <Box
      className={className}
      minH={colorScheme ? '100vh' : '0'}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      margin={margin}
      bg={useColorModeValue(colorScheme ? colorScheme : '#1652f0', 'gray.200')}
    >
      {/* <Center minH={{base:"0",md:"0"}} m="auto"> */}

      {children}
      {/* </Center> */}
    </Box>
  );
};

export default RXMain;
