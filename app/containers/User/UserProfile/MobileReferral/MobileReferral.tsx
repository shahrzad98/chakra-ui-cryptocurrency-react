import React from 'react';
import { Box, Stack, Text, Img, Flex, Button } from '@chakra-ui/react';
import {Spacer } from '@chakra-ui/layout';
import messages from '../referral/messages'; 
import { LanguageTools } from 'utils/languageTools';
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl';

const MobileReferral = () => {
  const language = LanguageTools();
  const history = useHistory();

  return (
    <>
      
      <Box marginTop="20px">

      <Box
          w={'100%'}
          boxShadow="md"
          padding="12px 10px"
          bg="#fff"
          textAlign="right"
        >
          <Flex
            onClick={e => {
              history.push(`/dashboard/profile`);
            }}
            textAlign="right"
            dir="rtl"
          >
            <Img src={require('images/icon _arrow_right.svg')} />
            <Text
              padding="0 10px 0 0"
              fontFamily="yekan"
              >حساب کاربری</Text>
          </Flex>
        </Box>

        
        <Stack dir={language.Dir} className={language.Align}>
          <Stack direction={['column', 'row']}>
            <Box boxShadow="md" width="100%" padding="10px" background="#fff">
              <Box w={{ base: '50%', sm: '50%', md: '50%', lg: '50%', xl: '50%' }} display="inline-block">
                <Text fontFamily="yekan" color="#788ca6">
                {<FormattedMessage {...messages.totalprofit} />}
                </Text>
                <Box marginTop="10px">
                  <Img
                    display="inline-block"
                    verticalAlign="text-bottom"
                    height="24px"
                    width="24px"
                    src={require('images/gift.svg')}
                  />
                  <Text
                    fontSize="17px"
                    marginRight="4px"
                    display="inline-block"
                    dir="ltr"
                    color="#233a7d"
                  >
                    ≈ 286,937,937
                  </Text>
                  <Text
                    color="#788ca6"
                    display="inline-block"
                    marginRight="4px"
                  >
                    {<FormattedMessage {...messages.toman} />}
                  </Text>
                </Box>
              </Box>
              <Box w={{ base: '50%', sm: '50%', md: '50%', lg: '50%', xl: '50%' }} display="inline-block" verticalAlign="text-bottom">
                <Box
                  w="100%"
                  padding="15px"
                  background="#f5f7fa"
                  margin="0 auto 0 0"
                  textAlign="center"
                >
                  <Text textAlign="right" color="#233a7d">
                  {<FormattedMessage {...messages.countinvite} />} {' '}
                  </Text>{' '}
                  
                  <Box textAlign="right">
                    <Text
                      textAlign="right"
                      display="inline-block"
                      color="#233a7d"
                    >
                      5
                    </Text>{' '}
                    <Text
                      textAlign="right"
                      display="inline-block"
                      fontFamily="yekan"
                      color="#233a7d"
                    >
                      {<FormattedMessage {...messages.N} />}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box
              padding="30px 25px"
              width="100%"
            >
              <hr/>
              <Text display="inline-block" fontFamily="yekan" color="#788ca6">
              {<FormattedMessage {...messages.Yourprofitpercentage} />}
              </Text>
              <Box marginRight="10px" display="inline-block" marginTop="15px">
                <Box
                  textAlign="center"
                  padding="3px 20px"
                  color="#fff"
                  display="inline-block"
                  background="#1652f0"
                >
                  0.01 %
                </Box>
                <Text color="#233a7d" fontSize="16px" display="inline-block" marginRight="12px">
                {<FormattedMessage {...messages.Fromallyourfriends} />}
                </Text>
              </Box>
            </Box>

            </Box>
         
          </Stack>
          <Stack marginTop="15px" direction={['column', 'row']}>
            <Box
              boxShadow="md"
              width="100%"
              padding="30px 20px"
              background="#fff"
            >
              <Flex alignItems="center">
                <Text fontSize="13px">
                {<FormattedMessage {...messages.InviteFriendsandprofit} />}
                </Text>
                <Spacer />
                <Box
                  padding="10px 20px"
                  borderRadius="20px"
                  background="#f3f5f8"
                >
                  {' '}
                  <Img
                    display="inline-block"
                    src={require('images/help-circle.svg')}
                  />{' '}
                  <Text
                    color="#233a7d"
                    marginRight="10px"
                    display="inline-block"
                  >
                    {<FormattedMessage {...messages.help} />}
                  </Text>
                </Box>
              </Flex>
              <Text color="#7c8592" fontFamily="yekan" marginTop="15px">
              {<FormattedMessage {...messages.yourcodetext} />}
              </Text>
              <Box marginTop="20px">
                <Text display="inline-block" color="#7c8592" fontSize="18px">
                {<FormattedMessage {...messages.yourinvitecode} />}
                </Text>
                <Text
                  marginRight="20px"
                  display="inline-block"
                  fontSize="16px"
                  fontFamily="graphikr"
                >
                  jdjak
                </Text>{' '}
                <Img
                  verticalAlign="sub"
                  marginRight="6px"
                  display="inline-block"
                  src={require('images/content-copy.svg')}
                />
              </Box>
              <Box marginTop="10px">
                <Text display="inline-block" color="#7c8592" fontSize="18px">
                <FormattedMessage {...messages.inviteLink} />
                </Text>
                <Text
                  marginRight="20px"
                  display="inline-block"
                  fontSize="16px"
                  fontFamily="graphikr"
                >
                  https://p.rabex.ir/resgister/jdjak
                </Text>{' '}
                <Img
                  verticalAlign="sub"
                  marginRight="12px"
                  display="inline-block"
                  src={require('images/content-copy.svg')}
                />
              </Box>

              <Box marginTop="20px" background="#f9fafc" padding="20px 40px">
                <Box display="inline-block" width="50%" position="relative">
                  <Text fontSize="16px" color="#7c8592">
                  {<FormattedMessage {...messages.Yourshare} />} :{' '}
                  </Text>
                  <Text marginTop="10px">100 %</Text>
                  <Box
                    height="55px"
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    borderLeft="2px solid #b7c0ca"
                  ></Box>
                </Box>
                <Box paddingRight="35px" display="inline-block" width="50%">
                  <Text fontSize="16px" color="#7c8592">
                  {<FormattedMessage {...messages.Yourfrindsshare} />} :{' '}
                  </Text>
                  <Text marginTop="10px">0 %</Text>
                </Box>
              </Box>


              <Button fontFamily="yekanfat" marginTop="20px" width="100%" borderRadius="2px" padding="26px 0" color="#fff" background="#1652f0" >{<FormattedMessage {...messages.InviteFriends} />}</Button>


            </Box>
            <Box
              boxShadow="md"
              padding="20px 30px"
              width="100%"
              background="#fff"
            >
              <Flex>
              <Text fontSize="20px" marginTop="14px" color="#050f19">{<FormattedMessage {...messages.createyourlink} />}</Text>
              <Spacer/>
              <Box
                  padding="10px 20px"
                  borderRadius="20px"
                  background="#f3f5f8"
                >
                  {' '}
                  <Img
                    display="inline-block"
                    src={require('images/help-circle.svg')}
                  />{' '}
                  <Text
                    color="#233a7d"
                    marginRight="10px"
                    display="inline-block"
                  >
                     {<FormattedMessage {...messages.help} />}
                  </Text>
                </Box>
              </Flex>
              <Text fontFamily="yekan" color="#7c8592" marginTop="15px"> {<FormattedMessage {...messages.createlinktxt} />}
              </Text>
              <Box padding="10px 15px" marginTop="20px" background="#f9fafc">
                <Box display="inline-block" width="50%" position="relative">
                  <Text fontSize="16px" color="#7c8592">
                  {<FormattedMessage {...messages.Yourshare} />} :{' '}
                  </Text>
                  <Text marginTop="10px">100 %</Text>
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
                  <Text marginTop="10px">0 %</Text>
                </Box>
              </Box>


              <Flex justifyContent="space-between" marginTop="15px">
              <Box  color="#050f19" border="1px solid #d2d4d6" p="3">
                20 %
              </Box>
              <Box  color="#050f19" marginRight="10px" border="1px solid #d2d4d6" p="3">
                40 %
              </Box>
              <Box  color="#050f19" marginRight="10px" border="1px solid #d2d4d6" p="3">
                100 %
              </Box>
              <Box  color="#050f19" marginRight="10px" border="1px solid #d2d4d6" p="3">
                80 %
              </Box>
              <Box color="#050f19" marginRight="10px" border="1px solid #d2d4d6" p="3">
                60 %
              </Box>
            </Flex>

            <Text color="#7c8592" marginTop="10px" fontSize="13px" textAlign="right">{<FormattedMessage {...messages.profitforfrind} />}</Text>


            <Button fontFamily="yekanfat" marginTop="20px" width="100%" borderRadius="2px" padding="26px 0" color="#fff" background="#1652f0" >{<FormattedMessage {...messages.createlink} />}</Button>

            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
export default MobileReferral;
