import * as React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PaginationLink from './PaginationLink/PaginationLink';
import PageGroup from './PageGroup/PageGroup';
import { Flex } from '@chakra-ui/layout';
import { FormattedMessage } from 'react-intl';

interface Pages {path: string, title: string}
type PaginationProps = {
  previous?: Pages;
  next?:  Pages
};

const Pagination: React.FC<PaginationProps> = ({ previous, next, ...rest }) => {
  return (
    <Flex padding="20px 0" cursor="pointer">
      <Flex alignSelf="center">
        <ChevronRightIcon ml="1" fontSize="1.2em" />
        <FormattedMessage id="app.containers.HomePage.previous" />
      </Flex>
      <SimpleGrid
        as="nav"
        aria-label="Pagination"
        spacing="10px"
        columns={6}
        {...rest}
      >
        {previous ? (
          <PaginationLink
            href={previous.path}
            rel="prev"
          >
            {previous.title}
          </PaginationLink>
        ) : (
          <div />
        )}
        <PageGroup pages={[1, 2, 3]} />

        {next ? (
          <PaginationLink
            href={next.path}
            rel="next"
          >
            {next.title}
          </PaginationLink>
        ) : (
          <div />
        )}
      </SimpleGrid>
      <Flex alignSelf="center" cursor="pointer">
        <FormattedMessage id="app.containers.HomePage.next" />

        <ChevronLeftIcon mr="1" fontSize="1.2em" />
      </Flex>
    </Flex>
  );
};

export default Pagination;
