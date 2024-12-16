/*
 *
 * CustomInputText
 *
 */

import React from 'react';
import './CustomInputText.scss';

import { Box, Text } from '@chakra-ui/react';
import CloseCircleIcon from 'images/close-circle.svg';

type PropTypes = {
  placeholder: string;
  endAdornment?: any;
  startAdornment?: any;
  value?: any;
  defaultValue?: any;
  style?: any;
  onClose?: () => void;
  onChange?: (e: any) => void;
  type?: string;
  fontSize?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CustomInputTextToman({
  placeholder,
  endAdornment,
  startAdornment,
  defaultValue,
  onClose,
  value,
  onChange,
  type,
  style,
}: PropTypes) {
  return (
    <>
      <Box
        height={{ base: '45px', xl: '42px' }}
        fontSize={{ base: '10px', md: '14px' }}
        className="inputcontainer"
        textAlign="center"
      >
        <input
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          {...(!endAdornment && {
            style: {
              paddingLeft: '0px',
            },
          })}
          style={style}
          type={type}
          className="inputbutton"
          placeholder={placeholder}
        />
        {startAdornment && (
          <Text
            fontSize={{ md: '14px', base: '10px' }}
            position="absolute"
            bottom="5px"
            left={{ base: '55px', md: '70px' }}
            height="24px"
            fontFamily="yekanfat"
            color="#1652f0"
          >
            {startAdornment}
          </Text>
        )}
        <Box
          position="absolute"
          right={{ base: '6px', lg: '20px' }}
          top="10px"
          {...(!endAdornment && {
            left: '10px',
          })}
        >
          <Box display={{ base: 'none', md: 'block' }}>
            <CloseCircleIcon width="19" height="19" onClick={onClose} />
          </Box>
          <Box display={{ base: 'block', md: 'none' }}>
            <CloseCircleIcon width="16" height="16" onClick={onClose} />
          </Box>
        </Box>
        {endAdornment && (
          <>
            <Box
              height="1.5rem"
              position="absolute"
              left={{ base: '44px', md: '52px' }}
              top="8px"
              borderLeft="1px solid #b7c0ca"
            />
            <Text
              position="absolute"
              left={{ base: '8px', md: '12px' }}
              fontSize={{ base: '11px', xl: '12px' }}
              color="#b7c0ca"
              top={{ base: '14px', md: '10px' }}
            >
              {endAdornment}
            </Text>
          </>
        )}
      </Box>
    </>
  );
}

export default CustomInputTextToman;
