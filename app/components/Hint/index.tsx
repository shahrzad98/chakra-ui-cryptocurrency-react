import React from 'react';
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
import LigthGrayIcon from 'images/light-gray.svg';

type PropTypes = {
  /**
   * The content of the component.
   */
  children: any;
};

const TextWraper = styled.div`
  display: grid;
  grid-row-gap: 13px;
  & > p {
    line-height: 1.75;
    text-decoration: none;
  }
  & a,
  & span {
    color: #1652f0;
  }
`;

const Hint = ({ children }: PropTypes) => (
  <Box
    fontFamily="yekan"
    background="#f6f6f8"
    padding={{ base: '8px 18px', sm: '8px 28px 26px 28px' }}
    gridTemplateColumns="18px 1fr"
    gridColumnGap="11px"
  >
    <Box display="block">
      <LigthGrayIcon width="30" fill="#1652f0" />
    </Box>

    <Box display="grid" gridRowGap="13px" marginTop="10px">
      <TextWraper color="#050f19">{children}</TextWraper>
    </Box>
  </Box>
);

export default Hint;
