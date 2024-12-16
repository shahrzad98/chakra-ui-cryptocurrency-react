/*
 *
 * DepositWithdraw
 *
 */

import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex, Spacer, Divider, Link, Img, ButtonProps } from '@chakra-ui/react';

import 'react-tabs/style/react-tabs.css';
import { Thead, Tbody, Tr, Th, Td, Table, SimpleGrid } from '@chakra-ui/react';
import { useHistory } from 'react-router';

import { sortTable } from '../../helper';
import {
  ContentCopy,
  MoreDots,
  ArrowTicket,
  CardTicket,
  SecurityTicket,
  FingerTicket,
  BuySellTicket,
  ExchangeTicket,
  DepositTicket,
  TicketWithdraw,
  TicketIcon,
  ArrowBack,
} from 'images/icon';
import { api } from '../../utils/network';
import { GetURL } from '../../utils/urlMap';
import moment from 'moment-jalaali';
import { ticketMobile, ticketDesktop } from '../../images/icon/index';
import { ToastContainer, toast } from 'react-toastify';
import { Paginator, Container, Previous, Next, PageGroup } from 'chakra-paginator';
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Ticket(props: Props) {
  const [TableShow, setTableShow] = useState(true);
  const [tickets, setTickets] = useState([]);
  const history: any = useHistory();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pagesQuantity, setPagesQuantity] = React.useState<number>(1);

  useEffect(() => {
    if (history?.location?.state?.state == 'category') {
      setTableShow(false);
    }
    api
      .post(GetURL('ticket-history'), {})
      .then((data: any) => {
        setTickets(data.responses);
        setPagesQuantity(Math.ceil(data.total / 10));
      })
      .catch(err => {});
  }, []);

  function Copy(id) {
    document?.getElementById(id)?.setAttribute('type', 'text');
    /* Get the text field */
    var copyText = document.getElementById(id) as HTMLInputElement;

    /* Select the text field */
    copyText?.select();
    copyText?.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator?.clipboard?.writeText(copyText?.value);
    document.getElementById(id)?.setAttribute('type', 'hidden');
    toast.success('شماره تیکت کپی شد', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function CopyMobile(id, index) {
    // var emailLink = document.getElementById(id);
    // var range = document.createRange();
    // if (emailLink) {
    //   range.selectNode(emailLink);
    //   window?.getSelection()?.addRange(range);

    //   try {
    //     // Now that we've selected the anchor text, execute the copy command
    //     var successful = document.execCommand('copy');
    //     var msg = successful ? 'successful' : 'unsuccessful';
    //     console.log('Copy email command was ' + msg);
    //   } catch (err) {
    //     console.log('Oops, unable to copy');
    //   }
    //   window?.getSelection()?.removeAllRanges();
    navigator.clipboard.writeText(id).then(
      function () {
        console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      },
    );
    toast.success('شماره تیکت کپی شد', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  type messageValueType = {
    ticketHumanReadableID: string;
    status: string;
    category: string;
    lastModified: Date;
    ticketUUID: string;
  };
  // handlers
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    getPaginationTickets(nextPage);
  };

  const getPaginationTickets = nextPage => {
    let offset = nextPage * 10 - 10;
    const paginationInfo = {
      offset: offset,
      limit: 10,
    };
    api
      .post(GetURL('ticket-history'), { paginationInfo: paginationInfo })
      .then((data: any) => {
        setTickets(data.responses);
        setPagesQuantity(Math.ceil(data.total / 10));
      })
      .catch(err => {});
  };

  const outerLimit = 2;
  const innerLimit = 2;
  const baseStyles: ButtonProps = {
    width: '30px',
    height: '34px',
    fontSize: 'sm',
  };
  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: '#f4f6fa',
    },
    bg: '#f4f6fa',
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: '#f4f6fa',
    },
    bg: 'white',
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
      <Box margin="0 auto" width={['100%', '100%', '100%', '96%', '1120px', '1120px', '1120px']}>
        <Flex
          onClick={e => {
            history.push(`/dashboard/ticket`);
          }}
          display={{ base: 'flex', lg: 'none' }}
          background="#fff"
          height="44px"
          alignItems="center"
          cursor="pointer"
          marginBottom="5px"
        >
          <Box marginRight="12px">
            <TicketIcon />
          </Box>
          <Text color="#233a7d" paddingRight="8px">
            تیکت
          </Text>
          <Spacer />
          <Flex paddingLeft="12px" alignItems="center">
            <ArrowBack />
          </Flex>
        </Flex>
        <Flex alignItems="center" borderBottom="2px solid #f4f6fa" width="100%" background="#fff" height="58px">
          <Flex alignItems="center">
            {TableShow ? (
              <Text lineHeight="55px" marginRight="20px" borderBottom="2px solid #233a7d" color="#233a7d">
                تاریخچه تیکت ها
              </Text>
            ) : (
              <React.Fragment>
                <Text lineHeight="55px" marginRight="20px" borderBottom="2px solid #233a7d" color="#233a7d">
                  تیکت پشتیبانی
                </Text>
              </React.Fragment>
            )}
          </Flex>
          <Spacer />
          <Button
            fontWeight="100"
            color="#fff"
            borderRadius="3px"
            marginLeft="24px"
            background="#1652f0"
            _active={{ background: '#1652f0' }}
            _hover={{ background: '#1652f0' }}
            onClick={e => {
              setTableShow(!TableShow);
            }}
          >
            <Flex>
              <Text fontSize="10px">{TableShow ? 'ایجاد تیکت جدید' : 'تاریخچه تیکت ها'}</Text>
            </Flex>
          </Button>
        </Flex>
        <Box background="#fff">
          <Box borderRadius="3px" display={TableShow ? { base: 'none', md: 'block' } : 'none'} padding="19px 24px">
            {tickets.length > 0 ? (
              <Table borderRadius="3px" className="transactionHistory" overflowX="auto" border="1px solid #EDF2F7">
                <Thead>
                  <Tr>
                    <Th width="5%" color="#788ca6" fontSize="14px" fontFamily="yekanb">
                      #
                    </Th>
                    <Th color="#788ca6" fontSize="14px" fontFamily="yekanb" width="20%">
                      شماره تیکت
                    </Th>

                    <Th
                      onClick={() => sortTable('transactionHistory', 1)}
                      width="15%"
                      color="#788ca6"
                      fontSize="14px"
                      fontFamily="yekanb"
                    >
                      وضعیت
                    </Th>
                    <Th color="#788ca6" width="15%" fontSize="14px" fontFamily="yekanb">
                      عنوان
                    </Th>
                    <Th width="15%" color="#788ca6" textAlign="left" fontSize="14px" fontFamily="yekanb">
                      آخرین بروزرسانی
                    </Th>
                    <Th width="30%" textAlign="left" color="#788ca6" fontSize="14px" fontFamily="yekanb">
                      اقدام
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tickets.map((value: messageValueType, index) => (
                    <Tr textAlign="right">
                      <Td textAlign="right">
                        <Text fontSize="14px">{++index}</Text>
                      </Td>
                      <Td fontFamily="yekan" fontSize="14px" textAlign="right">
                        <Flex>
                          <Text
                            cursor="pointer"
                            width="74px"
                            onClick={e => {
                              Copy(value.ticketHumanReadableID);
                            }}
                            marginLeft="8px"
                          >
                            {value.ticketHumanReadableID}
                          </Text>
                          <Box
                            cursor="pointer"
                            onClick={e => {
                              Copy(value.ticketHumanReadableID);
                            }}
                          >
                            <input value={value.ticketHumanReadableID} type="hidden" id={value.ticketHumanReadableID} />
                            <ContentCopy />
                          </Box>
                        </Flex>
                      </Td>

                      <Td textAlign="right">
                        {value.status === 'New' ? (
                          <Text fontSize="13px" color="#708599">
                            در انتظار
                          </Text>
                        ) : (
                          ''
                        )}

                        {value.status === 'Responded' ? (
                          <Text fontSize="13px" color="#4aab9a">
                            پاسخ پشتیبان
                          </Text>
                        ) : (
                          ''
                        )}

                        {value.status === 'WaitingForAdmin' ? (
                          <Text fontSize="13px" color="#ff8800">
                            منتظر پاسخ
                          </Text>
                        ) : (
                          ''
                        )}

                        {value.status === 'Done' ? (
                          <Text
                            fontSize="13px"
                            color="#1650e9
                          "
                          >
                            بسته شده
                          </Text>
                        ) : (
                          ''
                        )}
                      </Td>
                      <Td fontSize="13px" color="#050f19" textAlign="right">
                        {value.category}
                      </Td>
                      <Td fontSize="14px" color="#050f19" textAlign="left">
                        {moment(value.lastModified).format('jYYYY/jM/jD').split(' ')[0]}
                        <br />
                        {moment(value.lastModified).format('jYYYY/jM/jD HH:mm:ss').split(' ')[1]}
                      </Td>
                      <Td textAlign="left">
                        <Link
                          margin="7px 0"
                          w="100%"
                          display="inline"
                          fontSize="12px"
                          color="#1652f0"
                          onClick={() => history.push('/dashboard/ticket/messages/' + value.ticketUUID)}
                        >
                          مشاهده
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Img margin="0 auto" src={ticketDesktop} />
            )}
          </Box>
          <Box display={TableShow ? { base: 'block', md: 'none' } : 'none'} borderRadius="3px" padding="20px 16px">
            {tickets.length > 0 ? (
              <Table className="transactionHistory" overflowX="auto" border="1px solid #EDF2F7">
                <Thead>
                  <Tr>
                    <Th textAlign="right" fontSize="12px" fontFamily="yekanb">
                      شماره تیکت
                    </Th>
                    <Th textAlign="right" fontSize="12px" fontFamily="yekanb">
                      وضعیت
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tickets.map((value: messageValueType, index) => (
                    <Tr textAlign="right">
                      <Td textAlign="right">
                        <Text
                          onClick={e => {
                            history.push('/dashboard/ticket/messages/' + value.ticketUUID);
                          }}
                          fontSize="12px"
                          color="#050f19"
                        >
                          {value.category}
                        </Text>
                        <Flex
                          onClick={e => {
                            CopyMobile(value.ticketHumanReadableID, index);
                          }}
                        >
                          <Text
                            cursor="pointer"
                            fontSize="12px"
                            marginLeft="6px"
                            color="#050f19"
                            id={'m_' + value.ticketHumanReadableID}
                          >
                            {value.ticketHumanReadableID}
                          </Text>
                          <Box cursor="pointer">
                            <ContentCopy />
                          </Box>
                        </Flex>
                      </Td>
                      <Td
                        onClick={e => {
                          history.push('/dashboard/ticket/messages/' + value.ticketUUID);
                        }}
                        textAlign="right"
                      >
                        <Text fontSize="12px" dir="ltr">
                          {moment(value.lastModified, 'YYYY-M-D').format('jYYYY/jM/jD')}
                        </Text>
                        {value.status === 'New' ? (
                          <Text fontSize="12px" color="#708599">
                            در انتظار
                          </Text>
                        ) : (
                          ''
                        )}

                        {value.status === 'Responded' ? (
                          <Text fontSize="12px" color="#4aab9a">
                            پاسخ پشتیبان
                          </Text>
                        ) : (
                          ''
                        )}

                        {value.status === 'WaitingForAdmin' ? (
                          <Text fontSize="12px" color="#ff8800">
                            منتظر پاسخ
                          </Text>
                        ) : (
                          ''
                        )}

                        {value.status === 'Done' ? (
                          <Text fontSize="12px" color="#1650e9">
                            بسته شده
                          </Text>
                        ) : (
                          ''
                        )}
                      </Td>
                      <Td padding="0 14px">
                        <Flex>
                          <Divider color="#e4e4e4" height="20px !important" width="1px" orientation="vertical" />
                          <Spacer />
                          <MoreDots
                            onClick={e => {
                              history.push('/dashboard/ticket/messages/' + value.ticketUUID);
                            }}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Img width="100%" margin="0 auto" src={ticketMobile} />
            )}
          </Box>

          <Box display={TableShow ? { md: 'block' } : 'none'}>
            {/* <Pagination
              currentPage={page}
              setCurrentPage={handlePageChange}
              totalPages={9}
              edgePageCount={2}
              middlePagesSiblingCount={2}
              className="flex"
              truncableText="..."
              truncableClassName=""
            >
              <Pagination.NextButton className="">بعدی</Pagination.NextButton>

              <Box dir="rtl">
                <Box dir="ltr">
                  <Pagination.PageButton
                    activeClassName="pagination-active"
                    inactiveClassName=""
                    className="pagination-state"
                  />
                </Box>
              </Box>
              <Pagination.PrevButton className="">قبلی</Pagination.PrevButton>
            </Pagination> */}
            <Paginator
              pagesQuantity={pagesQuantity}
              currentPage={currentPage}
              outerLimit={outerLimit}
              activeStyles={activeStyles}
              innerLimit={innerLimit}
              normalStyles={normalStyles}
              onPageChange={handlePageChange}
            >
              <Container align="center" w="full" p={4}>
                <Previous _hover={{ background: '#fff' }} _active={{ background: '#fff' }} background="#fff">
                  قبلی
                </Previous>
                <PageGroup isInline align="center" />
                <Next _hover={{ background: '#fff' }} _active={{ background: '#fff' }} background="#fff">
                  بعدی
                </Next>
              </Container>
            </Paginator>
          </Box>
        </Box>

        <Box background="#fff" padding="0 25px 20px 25px" display={!TableShow ? { md: 'block' } : 'none'} dir="rtl">
          <Box paddingTop="39px" textAlign="center">
            <Text fontSize="16px" color="#233a7d">
              موضوع خود را انتخاب کنید
            </Text>
          </Box>
          <Box marginTop="32px" textAlign="center">
            <SimpleGrid textAlign="center" margin="0 auto" columns={[2, 2, 3, 4]} spacing={70}>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <ArrowTicket />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  موضوعات متداول
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <CardTicket height="55px" />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  حساب کاربری
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <SecurityTicket height="55px" />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  امنیت
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
                cursor="pointer"
                onClick={e => {
                  history.push(`/dashboard/ticket/faq/auth`);
                }}
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <FingerTicket height="55px" />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  احراز هویت
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <BuySellTicket height="55px" />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  خرید فروش
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <ExchangeTicket height="55px" />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  تبدیل
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <DepositTicket height="55px" />
                </Box>
                <Text fontSize="16px" color="#233a7d" marginTop="15px">
                  واریز
                </Text>
              </Box>
              <Box
                w={{ xl: '173px' }}
                height={{ xl: '173px' }}
                border="solid 0.5px #dbe3f1"
                margin="0 auto"
                textAlign="center"
              >
                <Box paddingTop="40px" display="flex" justifyContent="center">
                  <TicketWithdraw height="55px" />
                </Box>
                <Text fontSize="16px" color="#050f19" marginTop="15px">
                  برداشت
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Ticket;
