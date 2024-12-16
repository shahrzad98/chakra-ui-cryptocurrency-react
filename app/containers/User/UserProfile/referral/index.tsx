import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { FormattedMessage } from 'react-intl';
import { LanguageTools } from 'utils/languageTools';
import { Box, Stack, Flex, Spacer, Text } from '@chakra-ui/layout';
import messages from './messages';
import { Button, Img } from '@chakra-ui/react';
import Gift from 'images/gift.svg';
import ContentCopy from 'images/content-copy.svg';
import HelpCircle from 'images/help-circle.svg';

const Referral = () => {
  const language = LanguageTools();

  const copyInviteCode = (text: any) => {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  };

  return (
    <>
      <Stack dir={language.Dir} className={language.Align}>
        <Stack marginTop="20px" direction={['column', 'row']}>
          <Box boxShadow="md" width="65%" padding="30px 60px" background="#fff">
            <Box w="50%" display="inline-block">
              <Text fontSize="15px" fontFamily="yekan" color="#788ca6">
                {<FormattedMessage {...messages.totalprofit} />}
              </Text>
              <Box marginTop="10px">
                <Gift />
                <Text
                  fontSize="26px"
                  marginRight="6px"
                  display="inline-block"
                  dir="ltr"
                  color="#233a7d"
                >
                  ≈ 286,937,937
                </Text>
                <Text
                  fontFamily="yekan"
                  fontSize="20px"
                  color="#788ca6"
                  display="inline-block"
                  marginRight="12px"
                >
                  {<FormattedMessage {...messages.toman} />}
                </Text>
              </Box>
            </Box>
            <Box w="50%" display="inline-block" verticalAlign="text-bottom">
              <Box
                w="68%"
                padding="10px 0"
                background="#f5f7fa"
                margin="0 auto 0 0"
                textAlign="center"
              >
                <Text display="inline-block" color="#233a7d">
                  {<FormattedMessage {...messages.countinvite} />}
                </Text>{' '}
                <Text display="inline-block" fontSize="22px" color="#233a7d">
                  5
                </Text>{' '}
                <Text display="inline-block" fontFamily="yekan" color="#233a7d">
                  {<FormattedMessage {...messages.N} />}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box boxShadow="md" padding="30px 60px" width="35%" background="#fff">
            <Text fontFamily="yekan" color="#788ca6">
              {<FormattedMessage {...messages.Yourprofitpercentage} />}
            </Text>
            <Box marginTop="15px">
              <Box
                textAlign="center"
                padding="5px 8px"
                color="#fff"
                display="inline-block"
                background="#1652f0"
              >
                0.01 %
              </Box>
              <Text color="#233a7d" display="inline-block" marginRight="8px">
                {<FormattedMessage {...messages.Fromallyourfriends} />}
              </Text>
            </Box>
          </Box>
        </Stack>
        <Stack marginTop="15px" direction={['column', 'row']}>
          <Box boxShadow="md" width="65%" padding="30px 60px" background="#fff">
            <Flex alignItems="center">
              <Text fontSize="20px" color="#050f19">
                {<FormattedMessage {...messages.InviteFriendsandprofit} />}
              </Text>
              <Spacer />
              <Box padding="10px 25px" borderRadius="20px" background="#f3f5f8">
                <HelpCircle />
                <Text color="#233a7d" marginRight="10px" display="inline-block">
                  {<FormattedMessage {...messages.help} />}
                </Text>
              </Box>
            </Flex>
            <Text color="#7c8592" fontFamily="yekan" marginTop="15px">
              {<FormattedMessage {...messages.yourcodetext} />}
            </Text>
            <Box marginTop="20px">
              <Text display="inline-block" color="#7e8b9a" fontSize="18px">
                {<FormattedMessage {...messages.yourinvitecode} />}
              </Text>
              <Text
                marginRight="20px"
                display="inline-block"
                fontSize="16px"
                color="#050f19"
                fontFamily="graphikr"
                onClick={e => {
                  copyInviteCode('jdjak');
                }}
              >
                jdjak
              </Text>{' '}
              <ContentCopy
                onClick={e => {
                  copyInviteCode('jdjak');
                }}
              />
            </Box>
            <Box marginTop="10px">
              <Text display="inline-block" color="#7e8b9a" fontSize="18px">
                {<FormattedMessage {...messages.inviteLink} />}
              </Text>
              <Text
                marginRight="20px"
                display="inline-block"
                fontSize="16px"
                fontFamily="graphikr"
                color="#050f19"
                onClick={e => {
                  copyInviteCode('https://p.rabex.ir/resgister/jdjak');
                }}
              >
                https://p.rabex.ir/resgister/jdjak
              </Text>{' '}
              <ContentCopy
                onClick={e => {
                  copyInviteCode('https://p.rabex.ir/resgister/jdjak');
                }}
              />
            </Box>

            <Box marginTop="25px" background="#f9fafc" padding="20px 50px">
              <Box display="inline-block" width="50%" position="relative">
                <Text fontSize="16px" color="#7c8592">
                  {<FormattedMessage {...messages.Yourshare} />} :{' '}
                </Text>
                <Text fontSize="20px" color="#050f19" marginTop="10px">
                  100 %
                </Text>
                <Box
                  height="55px"
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  borderLeft="2px solid #b7c0ca"
                ></Box>
              </Box>
              <Box paddingRight="50px" display="inline-block" width="50%">
                <Text fontSize="16px" color="#7c8592">
                  {<FormattedMessage {...messages.Yourfrindsshare} />} :{' '}
                </Text>
                <Text fontSize="20px" color="#050f19" marginTop="10px">
                  0 %
                </Text>
              </Box>
            </Box>

            <Button
              fontFamily="yekanfat"
              marginTop="20px"
              width="100%"
              borderRadius="2px"
              padding="26px 0"
              color="#fff"
              background="#1652f0"
            >
              {<FormattedMessage {...messages.InviteFriends} />}
            </Button>
          </Box>
          <Box boxShadow="md" padding="20px 30px" width="35%" background="#fff">
            <Text fontSize="20px" marginTop="14px" color="#050f19">
              {<FormattedMessage {...messages.createyourlink} />}
            </Text>
            <Text fontFamily="yekan" color="#7c8592" marginTop="15px">
              {<FormattedMessage {...messages.createlinktxt} />}
            </Text>
            <Box padding="10px 15px" marginTop="20px" background="#f9fafc">
              <Box display="inline-block" width="50%" position="relative">
                <Text fontSize="16px" color="#7c8592">
                  {<FormattedMessage {...messages.Yourshare} />} :{' '}
                </Text>
                <Text fontSize="20px" color="#050f19" marginTop="10px">
                  100 %
                </Text>
                <Box
                  height="55px"
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  borderLeft="2px solid #b7c0ca"
                ></Box>
              </Box>
              <Box paddingRight="50px" display="inline-block" width="50%">
                <Text fontSize="16px" color="#7e8b9a">
                  {<FormattedMessage {...messages.Yourfrindsshare} />} :{' '}
                </Text>
                <Text fontSize="20px" color="#050f19" marginTop="10px">
                  0 %
                </Text>
              </Box>
            </Box>

            <Flex justifyContent="space-between" marginTop="15px">
              <Box
                fontSize="20px"
                color="#050f19"
                border="1px solid #d2d4d6"
                p="3"
              >
                20 %
              </Box>
              <Box
                fontSize="20px"
                color="#050f19"
                marginRight="10px"
                border="1px solid #d2d4d6"
                p="3"
              >
                40 %
              </Box>
              <Box
                fontSize="20px"
                color="#050f19"
                marginRight="10px"
                border="1px solid #d2d4d6"
                p="3"
              >
                100 %
              </Box>
              <Box
                fontSize="20px"
                color="#050f19"
                marginRight="10px"
                border="1px solid #d2d4d6"
                p="3"
              >
                80 %
              </Box>
              <Box
                fontSize="20px"
                color="#050f19"
                marginRight="10px"
                border="1px solid #d2d4d6"
                p="3"
              >
                60 %
              </Box>
            </Flex>
            <Text
              color="#7c8592"
              marginTop="10px"
              fontSize="13px"
              textAlign="right"
            >
              {<FormattedMessage {...messages.profitforfrind} />}
            </Text>
            <Button
              fontFamily="yekanfat"
              marginTop="20px"
              width="100%"
              borderRadius="2px"
              padding="26px 0"
              color="#fff"
              background="#1652f0"
            >
              {<FormattedMessage {...messages.createlink} />}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Referral;
