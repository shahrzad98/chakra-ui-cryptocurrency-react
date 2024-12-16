import { Link, Text } from '@chakra-ui/react';
import React from 'react';

type PaginationLinkProps = {
  label?: string;
  href: string;
  rel?: string;
};
const PaginationLink: React.FC<PaginationLinkProps> = ({
  label,
  href,
  rel,  children,
  ...rest
}) => {
  return (
    <Link href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        flex="1"
        borderRadius="md"
        {...rest}
      >
        <Text fontSize="sm" px="2">
          {label}
        </Text>
        <Text mt="1" fontSize="lg" fontWeight="bold" color="teal.400">
          {children}
        </Text>
      </Link>
    </Link>
  );
};

export default PaginationLink;
