import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from '../Header/header';
import Mfa from 'components/Mfa';

const TOTP = () => {
  const history = useHistory();
  // const { state } = useLocation();

  const [tasks] = useState(history.location.state?.tasks);
  const [historyUrl] = useState(history.location.state?.historyUrl);
  const [password] = useState(history.location.state?.password);

  return (
    <>
      <Box background="#1652f0" position="relative" w="100%" textAlign="center">
        <Header />
        <Box
          margin={{ xl: '0 auto', base: '30px auto' }}
          w={{ base: '92%', sm: '92%', md: '60%', lg: '40%', xl: '480px' }}
        >
          <Mfa margin="120px auto" task={tasks} historyUrl={historyUrl} password={password} />
        </Box>
      </Box>
      {/*
      <Box
        padding="0"
        position="relative"
        w="100%"
        onKeyDown={e => {
          // depraceated, needs an update
          if (e.charCode == 13 || e.keyCode == 13) {
            validate();
          }
        }}
        textAlign="center"
      >
        <Header />

        <Box
          textAlign="center"
          background="#fff"
          borderRadius="3px"
          margin={{ lg: '100px auto', md: '0 auto' }}
          w={{ base: '100%', sm: '100%', md: '60%', lg: '40%', xl: '25%' }}
        >
          <Box
            display={Secrets?.length == 1 || Secrets == null ? 'block' : 'none'}
          >
            <Box fontSize="20px" paddingTop="25px">
              <ChannelTranslate
                channelId={tasks?.current_task?.data?.channel_type}
              />
            </Box>
            <Box margin="15px 0 10px 0" color="#050f19" fontFamily="yekan">
              <FormattedMessage {...messages.message_header} />
              <br />
              <FormattedMessage
                color="#050f19"
                {...messages.message_trailer}
              />{' '}
              <Badge colorScheme="linkedin">
                {tasks?.current_task?.data?.address}
              </Badge>{' '}
            </Box>
            <Stack margin="0 auto">
              <Box>
                <Box textAlign="center" w="100%">
                  <Box
                    padding="20px"
                    bgGradient="linear-gradient(#fafafa, white)"
                  >
                    <Stack
                      alignItems="center"
                      direction={['row']}
                      marginTop="20px"
                    >
                      <Box textAlign="right" w={'86%'}>
                        <Text color="#708599">
                          <FormattedMessage
                            color="#050f19"
                            {...messages.Sixdigitcode}
                          />{' '}
                        </Text>
                        <Box position="relative">
                          <InsideProgress>
                            <Box w="15px">
                              <CircularProgressbar
                                value={elapsed}
                                maxValue="120"
                                minValue="0"
                                counterClockwise={true}
                                strokeWidth={50}
                                styles={buildStyles({
                                  strokeLinecap: 'butt',
                                  trailColor: '#fff',
                                  position: 'absolute',
                                })}
                              />
                            </Box>
                          </InsideProgress>
                        </Box>
                        <Input
                          border="1px solid #b5c0ca"
                          background="#fff"
                          type="number"
                          borderRadius="2px"
                          min="0"
                          onKeyDown={event => onEnterPress(event)}
                          onChange={e => setOtp(e.target.value)}
                        />
                      </Box>
                      <Box textAlign="right" w={'14%'}>
                        <Img
                          margin="auto 0 auto auto"
                          height="60px"
                          src={require('images/mobile.svg')}
                        />
                      </Box>
                    </Stack>

                    <VStack w="100%" marginTop="20px">
                      <Button
                        height="52px"
                        background="#1652f0"
                        color="#fff"
                        w="100%"
                        borderRadius="2px"
                        onClick={e => {
                          login();
                        }}
                        _hover={{ background: '#1652f0' }}
                      >
                        <FormattedMessage {...messages.Continuation} />
                      </Button>
                      <Button
                        height="52px"
                        background="#fff"
                        border="1px solid #d7dbdb"
                        w="100%"
                        borderRadius="2px"
                        fontSize="13px"
                        onClick={e =>
                          history.push('/auth/totp/reset', { tasks })
                        }
                      >
                        <FormattedMessage
                          {...messages.Resendverificationcode}
                        />
                      </Button>
                    </VStack>
                  </Box>

                  <Flex justifyContent="center" marginBottom="15px">
                    <NavLink display="inline-block" to="/auth/login">
                      <Box
                        borderRadius="4px"
                        display="inline-block"
                        color="#1652f0"
                        marginRight="4px"
                      >
                        <FormattedMessage {...messages.login} />
                      </Box>
                    </NavLink>
                    <Text
                      paddingTop="5px"
                      display="inline-block"
                      color="#050f19"
                      fontFamily="yekan"
                    >
                      <FormattedMessage {...messages.Alreadyhaveanaccount} />
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box padding="15px" display={Secrets?.length == 2 ? 'block' : 'none'}>
            <Text
              fontFamily="yekan"
              marginBottom="15px"
              textAlign="right"
              color="#050f19"
            >
              <FormattedMessage {...messages.TowFa} />
            </Text>

            <hr />

            <Text marginTop="15px" fontSize="24px" textAlign="right">
              {<FormattedMessage {...messages.totp_title} />}
            </Text>
            <Text
              textAlign="right"
              fontFamily="yekan"
              fontSize="13px"
              color="#050f19"
              marginTop="6px"
            >
              {<FormattedMessage {...messages.secureyouraccount} />}
            </Text>

            <P
              textAlign="right"
              margin="25px 0 6px 0"
              color="#050f19"
              text={<FormattedMessage {...messages.ConfirmMobileNumber} />}
            />
            <Flex>
              <Button
                border="1px solid #ECEFF1"
                color="#1652f0"
                lineHeight="unset"
                borderRadius="0 0 2px 2px"
                background="#fff"
                height="50px"
              >
                {<FormattedMessage {...messages.sendCode} />}
              </Button>
              <Input
                onChange={e => {
                  setOtp(e.target.value);
                }}
                height="50px"
                border="1px solid #ECEFF1"
                borderRadius="0px 2px 2px 0px"
              />
            </Flex>
            <P
              textAlign="right"
              margin="5px 0 0 0"
              color="#767676"
              fontFamily="yekan"
              text="کد شش رقمی ارسالی به شماره ***** را وارد کنید"
            />

            {Secrets?.map((value, key) =>
              value.channel_type == 1 ? (
                <Box>
                  <P
                    textAlign="right"
                    margin="25px 0 6px 0"
                    color="#050f19"
                    text={<FormattedMessage {...messages.ConfirmEmailAuth} />}
                  />
                  <Input
                    height="50px"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    border="1px solid #ECEFF1"
                    borderRadius="2px"
                  />
                  <P
                    textAlign="right"
                    margin="5px 0 0 0"
                    color="#767676"
                    fontFamily="yekan"
                    text={<FormattedMessage {...messages.CreateEmailAuth} />}
                  />
                </Box>
              ) : (
                ''
              ),
            )}

            {Secrets?.map((value, key) =>
              value.channel_type == 2 ? (
                <Box>
                  <P
                    textAlign="right"
                    margin="25px 0 6px 0"
                    color="#050f19"
                    text={<FormattedMessage {...messages.ConfirmGoogleAuth} />}
                  />
                  <Input
                    height="50px"
                    onChange={e => {
                      setGoogleCode(e.target.value);
                    }}
                    border="1px solid #ECEFF1"
                    borderRadius="2px"
                  />
                  <P
                    textAlign="right"
                    margin="5px 0 0 0"
                    color="#767676"
                    fontFamily="yekan"
                    text={<FormattedMessage {...messages.CreateGoogleAuth} />}
                  />
                </Box>
              ) : (
                ''
              ),
            )}

            <Button
              marginTop="30px"
              color="#fff"
              background="#1652f0"
              height="60px"
              width="100%"
            >
              <FormattedMessage {...messages.Continuation} />
            </Button>
          </Box>
        </Box>


      </Box>
     */}
    </>
  );
};

export default TOTP;
