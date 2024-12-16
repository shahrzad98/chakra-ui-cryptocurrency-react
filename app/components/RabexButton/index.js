import React from 'react';

import Img from '../Img';
import { Box, Button, Flex } from '@chakra-ui/react';

const RabexButton = props => {
  return (
    <Button
      _focus={props.focus}
      _hover={props.hover}
      _active={{
        bg: props.active,
      }}
      {...props}
      disabled={props.disabled}
    >
      <Flex alignItems={props.alignItems}>
        {props.img ? (
          <Box
            height={props.heightImg}
            height={props.widthImg}
            padding={props.PaddingImg}
            display={props.display}
          >
            {props.img}
          </Box>
        ) : null}

        {props.children ? props.children : props.text}
      </Flex>
    </Button>
  );
};

export default RabexButton;
