import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Img,
  Flex,
  Text,
} from '@chakra-ui/react';
import 'react-tabs/style/react-tabs.css';
import { FormattedMessage } from 'react-intl';
import messages from 'components/TransactionHistory/messages';
import { LanguageTools } from 'utils/languageTools';
import { useWindowSize } from 'helper/useWindowSize';
import Drawer from 'components/Drawer';
import CustomTable from "components/Table"
import TransactionRow from 'components/TransactionHistory/TransactionRow';
import SwitchTable from 'components/TransactionHistory/SwitchTable';
import DrawerContent from 'components/TransactionHistory/DrawerContent';
import Pagination from 'components/Pagianation';

import {
  transactionDesktop,
  transactionMobile,
} from '../../images/icon';

const mobileColumns = [
  {
   title: "تاریخ",
   align:"start",
   span: "3fr"
  },
  {
   title: "مقدار",
   align:"end",
   span: "4fr"
  },
  {
   title: "",
   span: "1fr"
  },
 ]
const withdrawCryptoColumns = [
  {
   title: "#",
   span: "1fr"
  },
  {
   title: "وضعیت",
   align:"start",
   span: "3fr"
  },
  {
   title: "کدتراکنش",
   align:"start",
   span: "3fr"
  },
  {
   title: "رمزارز",
   align:"start",
   span: "1fr"
  },
  {
   title: "تاریخ",
   align:"end",
   span: "3fr"
  },
  {
    title: "مقصد",
    align:"center",
    span: "6fr"
   },
  {
   title: "مقدار",
   align:"end",
   span: "4fr"
  },
  {
   title: "",
   span: "1fr"
  },
 ]
const withdrawTomanColumns = [
  {
   title: "#",
   span: "1fr"
  },
  {
   title: "وضعیت",
   align:"start",
   span: "3fr"
  },
  {
   title: "کدتراکنش",
   align:"start",
   span: "3fr"
  },
  {
   title: "تاریخ",
   align:"end",
   span: "3fr"
  },
  {
    title: "شماره شبا",
    align:"center",
    span: "6fr"
   },
  {
   title: "مقدار",
   align:"end",
   span: "4fr"
  },
  {
   title: "",
   span: "1fr"
  },
 ]
const depositTomanColumns = [
  {
   title: "#",
   span: "1fr"
  },
  {
   title: "وضعیت",
   align:"start",
   span: "3fr"
  },
  {
   title: "کدتراکنش",
   align:"start",
   span: "3fr"
  },
  {
   title: "تاریخ",
   align:"end",
   span: "3fr"
  },
  {
    title: "شماره کارت",
    align:"center",
    span: "6fr"
   },
  {
   title: "مقدار",
   align:"end",
   span: "4fr"
  },
  {
   title: "",
   span: "1fr"
  },
 ]
const depositCryptoColumns = [
  {
   title: "#",
   span: "1fr"
  },
  {
   title: "وضعیت",
   align:"start",
   span: "3fr"
  },
  {
   title: "کدتراکنش",
   align:"start",
   span: "3fr"
  },
  {
   title: "رمزارز",
   align:"start",
   span: "1fr"
  },
  {
   title: "تاریخ",
   align:"end",
   span: "3fr"
  },
  {
   title: "مقدار",
   align:"end",
   span: "4fr"
  },
  {
   title: "",
   span: "1fr"
  },
 ]

const UserTransActionHistory = () => {
  const language = LanguageTools();
  const { width } = useWindowSize()
  const isMobile = width < 768 ? true : false
  const [drawerIsOpen, setDrawerIsOpen] = React.useState<boolean>(false)

  return (
    <>
      <Box
        width={{ base: '100%', sm: '100%', md: '1120px' }}
        margin="0 auto"
        dir={language.Dir}
        className={language.Align}
      >
        <Tabs isLazy marginTop="20px">
          <TabList borderBottomWidth={{base:"2px", md:"3px"}} height={{base: "44px", md: "60px"}} background="#fff" padding={{base: "0 20px", md: "0px 40px"}}>
            <Flex w="100%">
              <Tab _selected={{ boxShadow: {base:"0px 2px 0 #233a7d !important", md:"0px 3px 0 #233a7d !important"} }} borderBottom="0" color="#233a7d" padding={{base: "5px", md: "10px"}} margin={{ base: '0 0 0 6px', md: '0 0 0 11px' }} fontSize={{base: "14px", md: "16px"}} fontWeight="bold">
                <FormattedMessage {...messages.BuyHistory} />
              </Tab>
              <Tab _selected={{ boxShadow: {base:"0px 2px 0 #233a7d !important", md:"0px 3px 0 #233a7d !important"} }} borderBottom="0" color="#233a7d" padding={{base: "5px", md: "10px"}} margin={{ base: '0 6px 0 6px', md: '0 11px 0 11px' }} fontSize={{base: "14px", md: "16px"}} fontWeight="bold">
                <FormattedMessage {...messages.SellHistory} />
              </Tab>
              <Tab _selected={{ boxShadow: {base:"0px 2px 0 #233a7d !important", md:"0px 3px 0 #233a7d !important"} }} borderBottom="0" color="#233a7d" padding={{base: "5px", md: "10px"}} margin={{ base: '0 6px 0 0', md: '0 11px 0 0' }} fontSize={{base: "14px", md: "16px"}} fontWeight="bold">
                <FormattedMessage {...messages.ChangeHistory} />
              </Tab>
            </Flex>
          </TabList>
          <TabPanels background="#fff" padding={{base:"16px 20px", md: "13px 40px"}}>
            <TabPanel padding="0" margin="0" overflowX="auto">
              <SwitchTable>
                <CustomTable
                  areas={isMobile ? "'date amount action''date status action'" : "'id status transactionId date cardno amount action'"}
                  empty={<Img margin="20px auto" src={isMobile ? transactionMobile : transactionDesktop} />}
                  columns={isMobile ? mobileColumns : depositTomanColumns}
                  rows={[
                    <TransactionRow
                      {...(!isMobile && {
                        id:"1",
                        transactionId:"4620422642483",
                        cardno:"5022-22**-****-**37"
                      })}
                      dateDirection="column"
                      status={{variant: "succeeded"}}
                      date={["1400/04/12", "19:29:30"]}
                      amount={{value: "25.000.000", des: "تومان"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"2",
                        transactionId:"4620422642348",
                        cardno:"5022-92**-****-**50"
                      })}
                      dateDirection="column"
                      status={{variant: "failed"}}
                      date={["1400/04/12", "19:28:12"]}
                      amount={{value: "256.000", des: "تومان"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"3",
                        transactionId:"4620422642834",
                        cardno:"5022-11**-****-**17"
                      })}
                      dateDirection="column"
                      status={{variant: "pending"}}
                      date={["1400/04/12", "14:24:44"]}
                      amount={{value: "895.000", des: "تومان"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />
                  ]}
                />
                <CustomTable
                  areas={isMobile ? "'crypto amount action''date status action'" : "'id status transactionId crypto date amount action'"}
                  empty={<Img margin="20px auto" src={isMobile ? transactionMobile : transactionDesktop} />}
                  columns={isMobile ? mobileColumns : depositCryptoColumns}
                  rows={[
                    <TransactionRow
                      {...(!isMobile && {
                        id:"1",
                        transactionId:"4620422642483"
                      })}
                      status={{variant: "succeeded"}}
                      crypto={{name:"اتریوم", channel:"ERC20"}}
                      date={["1400/04/12", "19:29:30"]}
                      amount={{lang:"en", value: "0.68", des:"ETH"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"2",
                        transactionId:"4620422642348"
                      })}
                      status={{variant: "failed"}}
                      crypto={{name:"بیت کوین", channel:"BTC"}}
                      date={["1400/04/12", "19:28:12"]}
                      amount={{lang:"en", value: "0.86", des:"BTC"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"3",
                        transactionId:"4620422642834"
                      })}
                      status={{variant: "pending"}}
                      crypto={{name:"ریپل", channel:"XRP"}}
                      date={["1400/04/12", "14:24:44"]}
                      amount={{lang:"en", value: "1458.25", des:"XRP"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />
                  ]}
                />
              </SwitchTable>
            </TabPanel>
            <TabPanel padding="0" margin="0" overflowX="auto">
              <SwitchTable>
                <CustomTable
                  areas={isMobile ? "'date amount action''date status action'" : "'id status transactionId date sheba amount action'"}
                  empty={<Img margin="20px auto" src={isMobile ? transactionMobile : transactionDesktop} />}
                  columns={isMobile ? mobileColumns : withdrawTomanColumns}
                  rows={[
                    <TransactionRow
                      {...(!isMobile && {
                        id:"1",
                        transactionId:"4620422642483",
                        sheba:"IR  20 2050 5029 5889 2025 5456 52"
                      })}
                      dateDirection="column"
                      status={{variant: "succeeded"}}
                      date={["1400/04/12", "19:29:30"]}
                      amount={{value: "25.000.000", des: "تومان"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"2",
                        transactionId:"4620422642348",
                        sheba:"IR  20 2050 5029 5889 2025 5456 53"
                      })}
                      dateDirection="column"
                      status={{variant: "failed"}}
                      date={["1400/04/12", "19:28:12"]}
                      amount={{value: "256.000", des: "تومان"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"3",
                        transactionId:"4620422642834",
                        sheba:"IR  20 2050 5029 5889 2025 5456 54"
                      })}
                      dateDirection="column"
                      status={{variant: "paying"}}
                      date={["1400/04/12", "14:24:44"]}
                      amount={{value: "895.000", des: "تومان"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />
                  ]}
                />
                <CustomTable
                  areas={isMobile ? "'crypto amount action''date status action'" : "'id status transactionId crypto date to amount action'"}
                  empty={<Img margin="20px auto" src={isMobile ? transactionMobile : transactionDesktop} />}
                  columns={isMobile ? mobileColumns : withdrawCryptoColumns}
                  rows={[
                    <TransactionRow
                      {...(!isMobile && {
                        id:"1",
                        transactionId:"4620422642483",
                        to: {value: "0x90ba52640cc .... 18844Cd1367C8"}
                      })}
                      crypto={{name:"اتریوم", channel:"ERC20"}}
                      status={{variant: "succeeded"}}
                      date={["1400/04/12", "19:29:30"]}
                      amount={{lang:"en", value: "0.68", des:"ETH"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"2",
                        transactionId:"4620422642348",
                        to:{value: "0x90ba52640cc .... 18844Cd1367C8"}
                      })}
                      crypto={{name:"بیت کوین", channel:"BTC"}}
                      status={{variant: "failed"}}
                      date={["1400/04/12", "19:28:12"]}
                      amount={{lang:"en", value: "0.86", des:"BTC"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />,
                    <TransactionRow
                      {...(!isMobile && {
                        id:"3",
                        transactionId:"4620422642834",
                        to:{value: "0x90ba52640cc .... 18844Cd1367C8", tag: "2936749203"}
                      })}
                      crypto={{name:"ریپل", channel:"XRP"}}
                      status={{variant: "pending"}}
                      date={["1400/04/12", "14:24:44"]}
                      amount={{lang:"en", value: "1458.25", des:"XRP"}}
                      onClick={() => setDrawerIsOpen(true)}
                    />
                  ]}
                />
              </SwitchTable>
            </TabPanel>
            <TabPanel padding="0" margin="0" overflowX="auto">
              <Box>3</Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box background="#fff" padding={{base: "0 20px", md: "0px 40px"}}>
          <Pagination />
        </Box>
      </Box>
      <Drawer
        size="sm"
        title={<FormattedMessage {...messages.depositDetails} />}
        isOpen={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
      >
        <DrawerContent
          status="succeeded"
          amount={{
            key: "مبلغ",
            des: "تومان",
            value: "25.000.000"
          }}
          transactionId={{
            key: "شماره سفارش",
            value: "19927346582",
          }}
          source={{
            key: "شماره شیا",
            value: "IR20 2050 5029 5889 2025 5456 52",
          }}
          items={[
            {
              key: "تاریخ",
              value: "1401/12/08 - 12:10:25"
            },
            {
              key: "زمان تقریبی برداشت",
              value: "1401/12/08 - 12:10:25"
            },
            {
              key: "کد رهگیری",
              value: <Text color="#fccd24">دردست بررسی</Text>
            },
          ]}
        />
      </Drawer>
    </>
  );
};

export default UserTransActionHistory;
