import React from 'react';
import { Text } from '@chakra-ui/react';

type PropTypes = {
  children: any[] | any;
  onClick: (e: object) => void;
  round?: boolean;
  display?: object | string;
};

const Button = ({ children, onClick, round, display, ...otherProps }: PropTypes) => {
  return (
    <Text
      bgColor="#f3f5f8"
      {...(round && {
        borderRadius: '20px',
      })}
      {...(display && { display })}
      padding={{
        base: '6px 12px 5px',
        md: '12px 22px 9px',
      }}
      color="#233a7d"
      flexDir="row"
      alignItems="center"
      margin={{
        base: '0 5px 0 0',
        md: '0 15px 0 0',
      }}
      onClick={e => onClick(e)}
      cursor="pointer"
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default Button;
