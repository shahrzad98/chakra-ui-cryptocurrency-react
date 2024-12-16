import * as React from 'react';
import {
  Box,
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { LanguageTools } from '../../../utils/languageTools';

type DesktopFooterProps = {};

const DesktopFooter: React.FC<DesktopFooterProps> = () => {
  // @ts-ignore
  const languageTools = new LanguageTools();
  return (
    <Box
      dir={languageTools.Dir}
      bg={useColorModeValue('gray.60', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      height="80px"
      borderTop="1px solid #cbcdd9"
      borderBottom="1px solid #cbcdd9"
    >
      <Box height="100%" w={'68%'} margin="0 auto">
        <List
          height="100%"
          className={languageTools.Align}
          dir={languageTools.Dir}
        >
          <Flex height="100%" alignItems="center">
            <ListItem marginRight="10px">
              {<FormattedMessage {...messages.home} />}
            </ListItem>
            <ListItem marginRight="60px">
              {<FormattedMessage {...messages.services} />}
            </ListItem>
            <ListItem marginRight="60px">
              {<FormattedMessage {...messages.about} />}
            </ListItem>
            <ListItem marginRight="60px">
              {<FormattedMessage {...messages.CareerOpportunities} />}
            </ListItem>
            <Text display="inline" margin="auto auto auto 0">
              {<FormattedMessage {...messages.copyright} />}
            </Text>
          </Flex>
        </List>
      </Box>
    </Box>
  );
};

export default DesktopFooter;
