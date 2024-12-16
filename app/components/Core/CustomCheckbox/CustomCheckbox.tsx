/*
 *
 * CustomCheckbox
 *
 */
import React from 'react';
import './CustomCheckbox.css';
import { Box, useBreakpointValue, Text, Spacer } from '@chakra-ui/react';
import styled from 'styled-components';
type LabelProps = {
  padding: string | undefined;
  columnGap: string | undefined;
};

const Label = styled.label`
  cursor: pointer;
  display: grid;
  padding: ${({ padding }: LabelProps) => padding || '24px 20px'};
  border: 1px solid #f4f6fa;
  grid-template-columns: 24px 1fr;
  grid-column-gap: ${({ columnGap }: LabelProps) => columnGap || '20px'};
  border-radius: 3px;
  &:hover {
    border-color: #1652f0;
  }
`;
const Span = styled.div`
  width: 22px;
  height: 20px;
  position: relative;
  border: 1px solid #d7dbdb;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    border-color: #1652f0;
  }
`;

type PropTypes = {
  text: string;
  endAdornment?: string;
};

const CustomCheckbox = ({ text, endAdornment }: PropTypes) => {
  const padding = useBreakpointValue({
    base: '18px 10px',
    sm: '24px 20px',
    md: '18px 10px',
    xl: '14px 20px',
  });
  const columnGap = useBreakpointValue({ base: '10px', md: '20px' });

  return (
    <Label padding={padding} columnGap={columnGap}>
      <input type="radio" className="check-custom" />
      <Span className="check-toggle" />
      <Box display="flex" alignItems="center">
        <Box>
          <Text fontSize="12px" color="#050f19">
            {text}
          </Text>
          <Text fontFamily="yekan" fontSize="10px" color="#050f19">
            Binance Smart Chain (BSC)
          </Text>
        </Box>
        <Spacer />
        {endAdornment && (
          <Text fontSize="12px" color="#050f19" fontFamily="graphik">
            {endAdornment}
          </Text>
        )}
      </Box>
    </Label>
  );
};

export default CustomCheckbox;
