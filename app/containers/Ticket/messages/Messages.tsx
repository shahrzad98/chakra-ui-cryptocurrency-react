import React, { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Flex, Spacer, Box, Text } from '@chakra-ui/react';
import TicketHeader from 'components/ticket/TicketHeader';
import SendTicket from 'components/ticket/SendTicket';
import { api } from '../../../utils/network';
import { GetURL } from '../../../utils/urlMap';
import parse from 'html-react-parser';
import moment from 'moment-jalaali';
import { TicketDownload } from '../../../images/icon';
import Editor from 'components/Editor';
import { ToastContainer, toast } from 'react-toastify';
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Messages(props: Props) {
  const [attachmentsAddresses, setAttachmentsAddresses] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>(new Array());
  const [userUUID, setUserUUID] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketHumanReadableID, setTicketHumanReadableID] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');

  const onChange = (value: string): void => {
    setTicketBody(value);
  };

  const validate = () => {
    if (ticketBody.length <= 21) {
      toast.error('مقدار توضیحات تیکت خالی است', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    api
      .post(GetURL('send-ticket'), {
        body: ticketBody,
        parentUUID: window.location.pathname.split('/')[4],
        attachmentsAddresses: attachmentsAddresses,
      })
      .then(data => {
        toast.success('تیکت شما با موفقیت ثبت شد', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        api
          .post(GetURL('ticket-details'), { ticketUUID: window.location.pathname.split('/')[4] })
          .then((data: any) => {
            setMessages(data.responses);
          })
          .catch(err => {});
      })
      .catch(err => {});
  };
  useEffect(() => {
    api
      .post(GetURL('ticket-details'), { ticketUUID: window.location.pathname.split('/')[4] })
      .then((data: any) => {
        setMessages(data.responses);
        setUserUUID(data.responses[0].targetUser.sub);
        setTicketHumanReadableID(data.responses[0].ticketHumanReadableID);
        setTicketCategory(data.responses[0].category);
      })
      .catch(err => {});
  }, []);
  type messageValueType = {
    targetUser: { sub: string };
    attachments: [];
    attachmentsAddresses: [];
    createdAt: Date;
    body: string;
    ticketUUID: string;
  };
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <Box margin="0 auto" width={['100%', '100%', '100%', '100%', '100%', '1120px']}>
        <Box
          padding={{ base: '16px', xl: '0' }}
          marginBottom="60px"
          position="relative"
          width={['100%', '100%', '100%', '100%', '100%', '1120px']}
        >
          <TicketHeader ticket_id={ticketHumanReadableID} ticket_title={ticketCategory} />
          {messages.map((value: messageValueType, index) => {
            return (
              <Box>
                {value.targetUser.sub == userUUID ? (
                  <Box background="#fff" padding={{ xl: '43px 21px 0 0', base: '13px 24px 11px 48px' }}>
                    <Flex
                      background="#fefefe"
                      padding="17px"
                      borderRadius="4px 4px 0 0"
                      border="1px solid rgba(173,185,196,.2)"
                      width={['100%', '100%', '100%', '100%', '80%', '800px']}
                    >
                      <Text fontSize={{ base: '12px', xl: '16px' }} color="#050f19">
                        شما
                      </Text>
                      <Spacer />
                      <Text dir="ltr" fontSize={{ base: '12px', xl: '16px' }} color="#050f19">
                        {moment(value.createdAt, 'YYYY-MM-DD HH:mm:ss Z').format('jYYYY/jM/jD [-] HH:mm:ss')}
                      </Text>
                    </Flex>
                    <Box
                      background="#fefefe"
                      padding="17px"
                      borderBottom="1px solid rgba(173,185,196,.2)"
                      borderRight="1px solid rgba(173,185,196,.2)"
                      borderLeft="1px solid rgba(173,185,196,.2)"
                      borderRadius="0 0 4px 4px"
                      width={['100%', '100%', '100%', '100%', '80%', '800px']}
                    >
                      <Text
                        fontSize={{ base: '14px', xl: '16px' }}
                        fontFamily="yekan"
                        lineHeight="30px"
                        color="#050f19"
                      >
                        {parse(value.body)}
                      </Text>

                      <Box dir="ltr">
                        {value.attachments.map((files: any, i) => (
                          <Flex
                            cursor="pointer"
                            padding="6px 17px"
                            width="200px"
                            margin="10px 8px"
                            alignItems="center"
                            height="34px"
                            borderRadius="3px"
                            background="#eef5ff"
                            onClick={() => {
                              window.open(
                                'http://192.168.100.6:80/api/v1/ticket/download/' +
                                  value.ticketUUID +
                                  '/' +
                                  files.fileName,
                                '_blank',
                              );
                            }}
                          >
                            <Text color="#233a7d">{files.fileName}</Text>
                            <Spacer />
                            <TicketDownload />
                          </Flex>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    background="#fff"
                    width="100%"
                    dir="ltr"
                    padding={{ xl: '43px 0 0 24px', base: '13px 48px 11px 24px' }}
                  >
                    <Flex
                      background="#eef5ff"
                      padding="17px"
                      border="1px solid #eef5ff"
                      borderRadius="4px 4px 0 0"
                      width={['100%', '100%', '100%', '100%', '80%', '800px']}
                      dir="rtl"
                    >
                      <Text fontSize={{ base: '12px', xl: '16px' }} color="##233a7d">
                        پشتیبان
                      </Text>
                      <Spacer />
                      <Text dir="ltr" fontSize={{ base: '12px', xl: '16px' }} color="#050f19">
                        {moment(value.createdAt, 'YYYY-MM-DD HH:mm:ss Z').format('jYYYY/jM/jD [-] HH:mm:ss')}
                      </Text>
                    </Flex>
                    <Box
                      background="#eef5ff"
                      padding="17px"
                      dir="rtl"
                      borderRadius="0 0 4px 4px"
                      border="1px solid #ffffff"
                      width={['100%', '100%', '100%', '100%', '80%', '800px']}
                    >
                      <Text
                        fontSize={{ base: '14px', xl: '16px' }}
                        fontFamily="yekan"
                        lineHeight="30px"
                        color="#050f19"
                      >
                        {parse(value.body)}
                      </Text>
                      <Box dir="ltr">
                        {value.attachments.map((file: any, i) => (
                          <Flex
                            cursor="pointer"
                            padding="6px 17px"
                            width="200px"
                            margin="10px 8px"
                            alignItems="center"
                            height="34px"
                            borderRadius="3px"
                            background="#fff"
                            onClick={() => {
                              window.open(
                                'http://192.168.100.6:80/api/v1/ticket/download/' +
                                  value.ticketUUID +
                                  '/' +
                                  file.fileName,
                                '_blank',
                              );
                            }}
                          >
                            <Text color="#233a7d">{file.fileName}</Text>
                            <Spacer />
                            <TicketDownload />
                          </Flex>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
          <Box padding="26px 24px 36px 24px" background="#fff">
            <Box textAlign="right">
              <Text
                marginTop={{ base: '11px', xl: '24px' }}
                marginBottom={{ base: '5px', xl: '10px' }}
                fontSize={{ base: '14px', xl: '16px' }}
                color="#233a7d"
              >
                پاسخ مجدد :
              </Text>
            </Box>

            <Box fontFamily="yekan" marginTop="10px">
              <Editor onChange={onChange} />
            </Box>

            <SendTicket
              onLoad={e => {
                validate();
              }}
              images={file => {
                // file = 'tmp/' + file;
                setAttachmentsAddresses([...attachmentsAddresses, file]);
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Messages;
