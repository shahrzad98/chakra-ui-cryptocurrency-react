/**
 *
 * MaterialSelect
 *
 */

import { Flex, Box } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import React from 'react';
import { ArrowSelected } from '../../images/icon';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const MaterialSelect = (props): JSX.Element => {
  let myElement: HTMLElement | null = document.getElementById(props.id);

  return (
    <Flex alignItems="center" dir="rtl">
      <Select borderRadius="2px" defaultValue={props.value} value={props.value} {...props} icon="">
        {props.children}
      </Select>
      <Box
        height={{ base: '45px', xl: '55px' }}
        padding={{ xl: '0 8px', base: '0 6px' }}
        margin={props.margin}
        id={`box${props.id}`}
        display="flex"
        alignItems="center"
        onClick={() => {
          if (myElement) myElement.style.display = 'block';
        }}
        background="rgba(0, 0, 0, 0.02)"
      >
        <Box width={{ base: '8px', xl: '12px' }}>
          <ArrowSelected />
        </Box>
      </Box>
    </Flex>
  );
};

export default MaterialSelect;
