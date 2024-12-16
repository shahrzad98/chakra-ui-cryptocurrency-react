import * as React from 'react';
import {Text } from '@chakra-ui/react';

const ErrorMessage =({children})=> {
 return (
   <Text fontFamily="yekanb" color="#f44336" fontSize="12px" padding="0 15px" position="absolute" bottom="-17px">
     {children}
   </Text>
 )
};

export default ErrorMessage;
