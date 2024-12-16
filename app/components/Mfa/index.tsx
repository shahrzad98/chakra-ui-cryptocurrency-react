/**
 *
 * Mfa
 *
 */
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Box, Input, Button, Text, Flex, Stack, VStack, Spacer } from '@chakra-ui/react';
import { GetURL } from 'utils/urlMap';
import { api } from 'utils/network';

import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useTimer } from '../../helper';
import { useHistory, useLocation, Link } from 'react-router-dom';
import TokenManager from '../../utils/TokenManager';
import MobileIcon from 'images/mobile.svg';
import ScaleLoader from 'react-spinners/ScaleLoader';

// import styled from 'styles/styled-components';

interface Props {
  onLoad: any;
  task: any;
  margin?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Mfa(props: Props) {
  const [Secrets, setSecrets] = useState([]);
  const [otp, setOtp] = useState('');
  const [emailTask, setEmailTask] = useState('');
  // const [googleCode, setGoogleCode] = useState('');
  const [tasks, setTasks] = useState(props.task);

  type LocationState = {
    state: {
      historyUrl: string;
      password: string;
    };
  };
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation<LocationState>();
  const history = useHistory();

  const onEnterPress = e => {
    if (e.keyCode == 13) {
      login();
      e.preventDefault();
    }
  };

  const getSecretList = () => {
    api
      .get(GetURL('get-secret-list'))
      .then(response => {
        setSecrets(response.data.data);
      })
      .catch(error => {
        if (error.data) {
        }
      });
  };

  useEffect(() => {
    if (otp.length >= 6) login();
  }, [otp]);

  const onChangeToTp = e => {
    setOtp(e.target.value);
  };

  const login = () => {
    setIsLoading(true);
    if (state?.state?.historyUrl == 'changePassword') {
      if (otp == '' && otp.length < 5) {
        setError('لطفا کد معتبر وارد نمایید');
        setIsLoading(false);
        return;
      }

      api
        .put(GetURL('change-password'), {
          tasks: tasks.tasks,
          totp: otp,
          password: state.state.password,
          password_confirm: state.state.password,
        })
        .then(response => {
          if (response.data?.error.code == '0') history.push('/auth/login');
        })
        .catch(error => {
          if (error?.data?.error?.validation_errors?.totp != 'undefined') {
            setError('کد وارد شده معتبر نیست');
          }
        });
      setIsLoading(false);
    } else {
      // props.onLoad('ok');
      api
        .post(GetURL('login-two-factor'), {
          tasks: tasks.tasks,
          totp: otp,
          channel_type: parseInt(tasks.current_task?.data?.channel_type),
        })
        .then(response => {
          // @ts-ignore
          if (response.error.code == 0) {
            TokenManager.set(response?.data);
            history.push('/dashboard');
          } else {
            setTasks(response?.data?.task_list);
            setEmailTask(response?.data?.task_list.tasks);
            requestCode(response?.data?.task_list.tasks, 'email');
          }
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);

          if (err?.data?.error?.code == '-1087') history.push('/login');
          if (err?.data?.error?.code == '-1085') {
            setError('کد وارد شده صحیح نیست');
          }
          if (err?.data?.error?.code == '-1098') {
            setError('شما قبلا از این رمزعبور استفاده کرده اید');
          }
          if (err?.data?.error?.code == '-1038') {
            setError('مقدار وارد شده معتبر نیست');
          }
        });
    }
  };

  useEffect(() => {
    console.log(props?.task);
    if (props?.task?.remaining_tasks) {
      console.log(props.task.remaining_tasks);
      setSecrets(props.task.remaining_tasks);
      if (props.task.remaining_tasks.length == 1) {
        requestCode(props.task.tasks, 'sms');
      }
    } else getSecretList();
  }, []);

  const [count, setCount] = useTimer('test', 0);
  const [emailCount, setEmailCount] = useTimer('test', 0);
  const [errorMessages, setError] = useState('');

  const requestCode = (task, totpName) => {
    if (totpName == 'sms') setCount(120);
    if (totpName == 'email') setEmailCount(120);

    api
      .post(GetURL('request-totp'), {
        tasks: task,
      })
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  };

  const InsideProgress = styled.div`
    position: absolute;
    right: 15px;
    z-index: 99999;
    top: 14px;
  `;

  const ErrorBox = styled.div`
    padding: 20px 35px;
    background: #f2dede;
    border: 1px solid #eed3d7;
    color: #c09853;
    direction: rtl;
    text-align: right;
  `;
  let Error;
  if (errorMessages != '') {
    Error = <ErrorBox>{errorMessages}</ErrorBox>;
  }
  return (
    <>
      <Box margin={{ lg: props.margin, md: '0 auto' }} w="100%">
        <Text fontSize={{ xl: '30px' }} marginBottom="22px" color="#fff">
          تایید دو مرحله ای
        </Text>
        <Box
          textAlign="center"
          padding="32px  0 25px 0"
          borderRadius="4px"
          // w={{ base: '100%', sm: '100%', md: '60%', lg: '40%', xl: '28%' }}
          display={Secrets?.length == 1 || Secrets == null ? 'block' : 'none'}
          background="#fff"
        >
          <Text color="#050f19" fontSize={{ xl: '24px', base: '20px' }}>
            {Secrets?.length == 1 ? (
              <FormattedMessage {...messages.sms_verification} />
            ) : (
              <FormattedMessage {...messages.TowAccept} />
            )}
          </Text>

          <Box padding={{ base: '0 45px', xl: '0 85px' }} margin="21px 0 10px 0" color="#050f19">
            <Text display="block" fontSize={{ base: '12px', xl: '16px' }} color="#050f19" fontFamily="yekan">
              <FormattedMessage {...messages.message_header} />
            </Text>
            <Box
              marginLeft="6px"
              padding="0 6px"
              display="inline-block"
              dir="ltr"
              color="#050f19"
              borderRadius="6px"
              background="rgba(21, 81, 237,0.1)"
            >
              <Text color="#050f19" fontSize={{ xl: '21px', base: '14px' }}>
                {'0' + tasks?.current_task?.data?.address}
              </Text>{' '}
            </Box>

            <Text display="inline-block" fontSize={{ base: '12px', xl: '16px' }} color="#050f19" fontFamily="yekan">
              <FormattedMessage {...messages.message_trailer} />
            </Text>
          </Box>
          <Stack margin="0 auto">
            <Box>
              <Box textAlign="center" w="100%">
                {state?.state?.historyUrl == 'changePassword' || state?.state?.historyUrl == 'register' ? (
                  <Box marginBottom="8px">
                    {state?.state?.historyUrl == 'changePassword' ? (
                      <Link to="/auth/login/forget" className="text-primary">
                        <FormattedMessage {...messages.editMobile} />
                      </Link>
                    ) : (
                      ''
                    )}
                    {state?.state?.historyUrl == 'register' ? (
                      <Link to="/auth/register" className="text-primary">
                        <FormattedMessage {...messages.editMobile} />
                      </Link>
                    ) : (
                      ''
                    )}
                  </Box>
                ) : (
                  ''
                )}

                {Error}
                <Box padding="25px 30px 25px 30px" bgGradient="linear-gradient(#fafafa, white)">
                  <Stack alignItems="flex-end" direction={['row']}>
                    <Box height="50px" textAlign="right" marginLeft="14px">
                      <MobileIcon height="50" />
                    </Box>

                    <Box textAlign="right" w="86%">
                      <Text paddingBottom="3px" fontSize={{ base: '10px', xl: '14px' }} color="#708599">
                        <FormattedMessage color="#050f19" {...messages.Sixdigitcode} />{' '}
                      </Text>

                      <Box position="relative">
                        <InsideProgress>
                          <Box w="20px">
                            {/* // @ts-ignore */}
                            <CircularProgressbar
                              value={count}
                              maxValue={120}
                              minValue={0}
                              counterClockwise
                              strokeWidth={50}
                              styles={buildStyles({
                                pathColor: '#1652f0',
                                strokeLinecap: 'butt',
                                trailColor: '#fff',
                                // @ts-ignore
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
                        height="50px"
                        borderRadius="2px"
                        dir="ltr"
                        // @ts-ignore
                        // onPaste={(e: ClipboardEvent) => setOtp(e.target.value)}
                        onKeyDown={event => onEnterPress(event)}
                        onChange={e => {
                          if (e.target.value.length <= 6) {
                            setError('');
                            setOtp(e.target.value);
                          } else {
                            e.target.value = e.target.value.slice(0, 6);
                            setOtp(e.target.value);
                          }
                        }}
                      />
                    </Box>
                  </Stack>

                  <VStack w="100%" marginTop="20px">
                    <Button
                      height="50px"
                      background="#1652f0"
                      _active={{ background: '1652f0' }}
                      color="#fff"
                      w="100%"
                      fontSize={{ xl: '17px', base: '13px' }}
                      borderRadius="4px"
                      onClick={e => {
                        login();
                      }}
                      _hover={{ background: '#1652f0' }}
                    >
                      {isLoading ? (
                        <Box marginTop="8px">
                          <ScaleLoader height={20} color={'#fff'} />
                        </Box>
                      ) : (
                        <Text>
                          <FormattedMessage {...messages.Continuation} />
                        </Text>
                      )}
                    </Button>
                    <Button
                      height="50px"
                      background="#fff"
                      border="2px solid #d7dbdb"
                      w="100%"
                      color="#000"
                      borderRadius="4px"
                      fontSize={{ xl: '17px', base: '13px' }}
                      disabled={count > 0}
                      onClick={e => {
                        setError('کد جدید برای شما ارسال شد');
                        requestCode(props.task.tasks, 'sms');
                      }}
                    >
                      <FormattedMessage {...messages.Resendverificationcode} />
                    </Button>
                  </VStack>
                </Box>

                {/* <Flex justifyContent="center" marginBottom="15px">
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
              </Flex> */}
              </Box>
            </Box>
          </Stack>
        </Box>

        <Box
          textAlign="center"
          padding="23px"
          background="#fff"
          borderRadius="3px"
          margin={{ lg: props.margin, md: '0 auto' }}
          w="100%"
          // {{ base: '100%', sm: '100%', md: '60%', lg: '40%', xl: '27%' }}
          display={Secrets?.length == 2 ? 'block' : 'none'}
        >
          <Text fontSize="32px" textAlign="right" color="#050f19">
            <FormattedMessage {...messages.totp_title} />
          </Text>
          <Text textAlign="right" fontFamily="yekan" fontSize="14px" color="#050f19" marginTop="9px">
            <FormattedMessage {...messages.secureyouraccount} />
          </Text>

          <Text textAlign="right" margin="23px 0 6px 0" color="#050f19">
            <FormattedMessage {...messages.ConfirmMobileNumber} />
          </Text>
          <Flex>
            <Input
              onChange={onChangeToTp}
              onPaste={e => {}}
              className="target"
              w="78%"
              height="50px"
              border="1px solid #ECEFF1"
              borderRadius="0px 2px 2px 0px"
            />
            <Spacer />

            <Button
              border="1px solid #ECEFF1"
              color="#1652f0"
              borderRadius="0 0 2px 2px"
              background="#fff"
              height="50px"
              width="72px"
              disabled={count > 0}
              onClick={e => {
                requestCode(props?.task?.tasks, 'sms');
              }}
            >
              {count > 0
                ? `${count % 60 > 10 ? count % 60 : `0${count % 60}`} : ${
                    Math.ceil(count / 60) - 1 > 0 ? `0${Math.ceil(count / 60) - 1}` : '0'
                  }`
                : 'ارسال کد'}
            </Button>
          </Flex>
          <Text textAlign="right" margin="5px 0 0 0" color="#767676" fontFamily="yekan">
            کد شش رقمی ارسالی به شماره ***** را وارد کنید
          </Text>

          {Secrets?.map((value: any, key) =>
            value?.data?.channel_type == 1 ? (
              <Box>
                <Text textAlign="right" margin="29px 0 6px 0" color="#050f19">
                  <FormattedMessage {...messages.ConfirmEmailAuth} />
                </Text>
                <Flex>
                  <Input
                    height="50px"
                    w="78%"
                    onChange={e => {
                      setOtp(e.target.value);
                    }}
                    border="1px solid #ECEFF1"
                    borderRadius="2px"
                  />
                  <Spacer />

                  <Button
                    border="1px solid #ECEFF1"
                    color="#1652f0"
                    borderRadius="0 0 2px 2px"
                    background="#fff"
                    height="50px"
                    width="72px"
                    disabled={emailCount > 0}
                    onClick={e => {
                      requestCode(emailTask, 'email');
                    }}
                  >
                    {emailCount > 0
                      ? `${emailCount % 60 > 10 ? emailCount % 60 : `0${emailCount % 60}`} : ${
                          Math.ceil(emailCount / 60) - 1 > 0 ? `0${Math.ceil(emailCount / 60) - 1}` : '0'
                        }`
                      : 'ارسال کد'}
                  </Button>
                </Flex>
                <Text textAlign="right" margin="5px 0 0 0" color="#767676" fontFamily="yekan">
                  <FormattedMessage {...messages.CreateEmailAuth} />
                </Text>
              </Box>
            ) : (
              ''
            ),
          )}

          {Secrets?.map((value: any, key) =>
            value?.data?.channel_type == 2 ? (
              <Box>
                <Text textAlign="right" margin="29px 0 6px 0" color="#050f19">
                  <FormattedMessage {...messages.ConfirmGoogleAuth} />
                </Text>
                <Input
                  height="50px"
                  onChange={e => {
                    // setGoogleCode(e.target.value);
                  }}
                  border="1px solid #ECEFF1"
                  borderRadius="2px"
                />
                <Text textAlign="right" margin="5px 0 0 0" color="#767676" fontFamily="yekan">
                  <FormattedMessage {...messages.CreateGoogleAuth} />
                </Text>
              </Box>
            ) : (
              ''
            ),
          )}

          <Button
            marginTop="24px"
            color="#fff"
            background="#1652f0"
            height="50px"
            fontSize="16px"
            width="100%"
            onClick={() => {
              login();
            }}
          >
            {isLoading ? (
              <Box marginTop="8px">
                <ScaleLoader height={20} color={'#fff'} />
              </Box>
            ) : (
              <Text>
                <FormattedMessage {...messages.Continuation} />
              </Text>
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Mfa;
