import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
type PropTypes = {
  to: string;
  children?: any;
  focusStyles?: any;
  rounded?: string;
  color?: string;
  height?: string;
  borderBottom?: string;
  display?: string;
};
const RXNavLink = ({ children, to, focusStyles, rounded, color, height, borderBottom, display }: PropTypes) => (
  <Link
    borderBottom={borderBottom}
    to={to}
    color={color}
    height={height ? height : '100%'}
    alignSelf="center"
    as={RouterLink}
    display={display}
    px={2}
    py={1}
    rounded={rounded}
    _focus={focusStyles}
    _active={focusStyles}
    _hover={{
      textDecoration: 'none',
      color: 'none',
    }}
  >
    {children}
  </Link>
);

export default RXNavLink;
