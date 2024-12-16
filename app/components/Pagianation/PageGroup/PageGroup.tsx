import * as React from 'react';
import { Box, HStack, Icon } from '@chakra-ui/react';
import { useState } from 'react';

// import { useGeneratePages } from "../lib/hooks/useGeneratePages";

type PageGroupProps = { pages: number[] };

const PageGroup: React.FC<PageGroupProps> = ({ pages }) => {
  const CircleIcon = props => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  // const { pages } = useGeneratePages();
  const [activePage, setActivePage] = useState<number>(0);
  return (
    <>
      {pages.map((page, index) => (
        <Box
          onClick={() => setActivePage(index)}
          backgroundColor={activePage === index ? '#f5f5f5' : 'transparent'}
          padding="5px 10px"
          borderRadius="3px"
          margin="0"
          cursor="pointer"
        >
          {page}
        </Box>
      ))}

      <HStack>
        <CircleIcon boxSize={1} />
        <CircleIcon boxSize={1} />
        <CircleIcon boxSize={1} />
      </HStack>
    </>
  );
};

export default PageGroup;
