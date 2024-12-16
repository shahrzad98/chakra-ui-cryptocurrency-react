import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import Typography from 'components/Typography';
import _map from 'lodash/map';

type ItemsType = {
  url: string;
  text: string;
};

type PropsType = {
  items: Array<ItemsType>;
  title?: string;
};

const Links = ({ items, title }: PropsType) => {
  return (
    <Box display="grid" gridRowGap="9px">
      <Text fontSize="12px" fontWeight={100}>
        {title}
      </Text>
      <Box display="flex" flexWrap="wrap">
        {_map(items, (item, i) => (
          <Link
            key={i}
            fontSize={{ base: '10px', md: '10px' }}
            color="#8d9eae"
            textDecoration="underline"
            fontFamily="graphik"
            margin="0 0 9px 15px"
            href={item.url}
            _focus={{ textDecorationLine: 'underline', border: 'none', color: '#8d9eae' }}
            _hover={{ textDecorationLine: 'underline', color: '#8d9eae' }}
          >
            {item.text}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Links;
