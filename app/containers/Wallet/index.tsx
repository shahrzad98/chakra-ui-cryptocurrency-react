
import React from 'react';
import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import BTCIcon from 'images/btc.svg'
import { WarningIcon } from '@chakra-ui/icons'

import { useWindowSize } from 'helper/useWindowSize';
import Pagination from 'components/Pagianation';
import CustomTable from "components/Table"
import { LanguageTools } from 'utils/languageTools';
import { api } from 'utils/network';
import { GetURL } from 'utils/urlMap';
import Assets from "./Assets"
import Links from "./Links"
import WalletRow from "./WalletRow"
import Search from "./Search"
import Message from "./Message"

type walletPropTypes = {}

const Columns = [
  {
   title: "دارایی",
   align:"center",
   span: "3fr"
  },
  {
   title: "دارایی کل",
   align:"center",
   span: "2fr"
  },
  {
   title: "دارایی دردسترس",
   align:"center",
   span: "2fr"
  },
  {
   title: "درصد پرتفو ٪",
   align:"start",
   span: "2fr"
  },
  {
   title: "اقدام",
   align:"start",
   span: "3fr"
  },
 ]

const MobileColumns = [
  {
   title: "دارایی",
   align:"start",
   span: "2fr"
  },
  {
   title: "میزان دارایی",
   align:"start",
   span: "2fr"
  },
  {
   title: "اقدام",
   align:"center",
   span: "1fr"
  },
 ]

const Wallet = ({}: walletPropTypes) => {
  const language = LanguageTools();
  const { width } = useWindowSize()
  const isMobile = width < 768 ? true : false

  React.useEffect(() => {
    api.get(GetURL('warehouse-balance')).then(response => {
      console.log(response);
    });
  })

  return (
    <Flex
      direction="column"
      width={{ base: '100%', sm: '100%', md: '1120px' }}
      marginX="auto"
      marginBottom="50px"
      gridGap="15px"
      dir={language.Dir}
      className={language.Align}
    >
      <Box display="grid" gridTemplateColumns={{base: "unset", md: "2fr 1fr"}} gridGap="10px">
        <Assets />
        <Links />
      </Box>
      <Message
        title="غیرفعال شدن برداشت‌های ریالی"
        description="امکان برداشت تومانی از کیف پول به طور موقت تا ۲۴ ساعت دیگر وجود نخواهد بود"
        icon={<WarningIcon width={{base: "25px", md: "33px"}} height={{base: "25px", md: "33px"}} />}
        variant="error"
      />
      <Box backgroundColor="#fff">
        <Tabs isLazy>
            <TabList borderBottomWidth={{base:"0", md:"3px"}} height={{base: "44px", md: "60px"}} background="#fff" padding={{base: "0 20px", md: "0px 40px"}}>
              <Flex w="100%" justifyContent="space-between">
                <Tab display={{base: "none", md: "unset"}} _selected={{ boxShadow: {base:"0px 2px 0 #233a7d !important", md:"0px 3px 0 #233a7d !important"} }} borderBottom="0" color="#233a7d" padding={{base: "5px", md: "10px"}} margin={{ base: '0 0 0 6px', md: '0 0 0 11px' }} fontSize={{base: "14px", md: "16px"}} fontWeight="bold">
                  دارایی‌های شما
                </Tab>
                <Search />
              </Flex>
            </TabList>
            <TabPanels background="#fff" padding={{base:"16px 20px", md: "25px 40px"}}>
              <TabPanel padding="0" margin="0" overflowX="auto">
                <CustomTable
                  areas={isMobile ? "'asset available links'" : "'asset total available percent links'"}
                  empty="خالی"
                  columns={isMobile ? MobileColumns : Columns}
                  rows={[
                    <WalletRow
                      {...(!isMobile && {
                        total: "16,837,837",
                        percent: 50.84,
                      })}
                      available="16,837,837"
                      asset={{
                        name: "تومان",
                        des: "TOMAN",
                        icon: <BTCIcon width={isMobile ? "14px" : "29px"} height={isMobile ? "14px" : "29px"} />
                      }}
                      links={[
                        {
                          anchor: "برداشت",
                          path: "/"
                        },
                        {
                          anchor: "واریز",
                          path: "/"
                        },
                      ]}
                    />,
                    <WalletRow
                      {...(!isMobile && {
                        total: "0.00156",
                        percent: 45.83,
                      })}
                      available="0.00156"
                      asset={{
                        name: "بیت کوین",
                        des: "Bitcoin BTC",
                        icon: <BTCIcon width={isMobile ? "14px" : "29px"} height={isMobile ? "14px" : "29px"} />
                      }}
                      links={[
                        {
                          anchor: "برداشت",
                          path: "/"
                        },
                        {
                          anchor: "واریز",
                          path: "/"
                        },
                        {
                          disable: true,
                          anchor: "تبدیل",
                          path: "/"
                        },
                        {
                          disable: true,
                          anchor: "خرید",
                          path: "/"
                        },
                        {
                          disable: true,
                          anchor: "فروش",
                          path: "/"
                        },
                      ]}
                    />,
                    <WalletRow
                      {...(!isMobile && {
                        total: "1340.74",
                        percent: 12.83,
                      })}
                      available="1340.74"
                      asset={{
                        name: "تتر",
                        des: "Tether USDT",
                        icon: <BTCIcon width={isMobile ? "14px" : "29px"} height={isMobile ? "14px" : "29px"} />
                      }}
                      links={[
                        {
                          anchor: "برداشت",
                          path: "/"
                        },
                        {
                          anchor: "واریز",
                          path: "/"
                        },
                        {
                          anchor: "تبدیل",
                          path: "/"
                        },
                        {
                          anchor: "خرید",
                          path: "/"
                        },
                        {
                          anchor: "فروش",
                          path: "/"
                        },
                      ]}
                    />
                  ]}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        <Box background="#fff" padding={{base: "0 20px", md: "0px 40px"}}>
          <Pagination />
        </Box>
      </Box>
    </Flex>
  );
}

export default Wallet;
