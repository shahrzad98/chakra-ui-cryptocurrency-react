import React, { useState, Suspense } from 'react';
import CreditCardIcon from 'images/creditcard.svg';
import Account from 'images/account.svg';
import LockGray from 'images/lockgray.svg';
import GiftTab from 'images/gifttab.svg';
import { Wallet } from 'images/icon';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Stack,
} from '@chakra-ui/react';

import 'react-tabs/style/react-tabs.css';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import Referral from './referral';

import Profile from './Profile';
import MobileProfile from './MobileProfile';

import CreditCard from './CreditCard';
import SecuritySettings from './SecuritySettings';
import { LanguageTools } from '../../../utils/languageTools';
import TitleBar from '../../../components/TitleBar';
import P from '../../../components/P';
import Button from '../../../components/RabexButton';
import { useHistory } from 'react-router';

const UserProfile = () => {
  const language = new LanguageTools();
  const history = useHistory();
  const [isMyAccount, setIsMyAccount] = useState(false);

  const ChangeAccount = () => {
    setIsMyAccount(!isMyAccount);
  };

  return (
    <>
      <Box
        w={'80%'}
        margin="0 auto"
        dir={language.Dir}
        className={language.Align}
        display={{ base: 'none', md: 'block' }}
      >
        <TitleBar
          children={<FormattedMessage {...messages.Account} />}
          color="#fff"
          height="100px"
          marginTop="20px"
          icon={<Wallet />}
          background="rgb(22, 82, 240)"
        />

        <Tabs isLazy>
          <TabList height="65px" background="#fff">
            <Tab color="#778ca6" margin="0 40px 0 20px" fontSize="14px">
              <Account />
              {<FormattedMessage {...messages.Account} />}
            </Tab>
            <Tab color="#778ca6" margin="0 20px 0 20px" fontSize="14px">
              <CreditCardIcon className="mx-2" />
              {<FormattedMessage {...messages.MyBankCards} />}
            </Tab>
            <Tab color="#778ca6" margin="0 20px 0 20px" fontSize="14px">
              <LockGray className="mx-2" />
              {<FormattedMessage {...messages.ChangeMyPassword} />}
            </Tab>
            <Tab color="#778ca6" margin="0 20px 0 20px" fontSize="14px">
              <GiftTab className="mx-2" />
              {<FormattedMessage {...messages.InviteFriends} />}
            </Tab>
          </TabList>

          <TabPanels background="#f4f6fa" minHeight="600px">
            <TabPanel padding="0">
              <Profile />
            </TabPanel>
            <TabPanel padding="0">
              <CreditCard />
            </TabPanel>
            <TabPanel padding="0">
              <SecuritySettings />
            </TabPanel>
            <TabPanel padding="0">
              <Referral />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box
        w={'100%'}
        margin="15px 10px 0 10px"
        dir={language.Dir}
        className={language.Align}
        display={{ base: 'block', md: 'none' }}
      >
        <TitleBar
          children={<FormattedMessage {...messages.Account} />}
          color="#fff"
          height="70px"
          icon={<Wallet />}
          background="rgb(22, 82, 240)"
        />

        <Box padding="20px 15px" boxShadow="base" rounded="sm" bg="white">
          <Stack direction={['row', 'column']}>
            <Box width={{ base: '30%', sm: '30%' }}>
              <P text="سلمان طاقونی" color="#000" />
              <P text="گروه کاربری : عادی" />
            </Box>

            <Box width={{ base: '70%', sm: '70%' }}>
              <Button float="left" text="برو به احراز هویت" />
            </Box>
          </Stack>
        </Box>

        <Box marginTop="10px" boxShadow="base" rounded="sm" bg="white">
          <MobileProfile />
        </Box>

        <Box marginTop="10px" boxShadow="base" rounded="sm" bg="white">
          <Box
            padding="20px 15px"
            onClick={e => {
              history.push(`/dashboard/profile/bank`);
            }}
          >
            <P text="اطلاعات بانکی" />
          </Box>
        </Box>

        <Box marginTop="10px">
          <Box
            boxShadow="base"
            rounded="sm"
            padding="20px 15px"
            bg="white"
            onClick={e => {
              history.push(`/dashboard/profile/security`);
            }}
          >
            <P text="تنظیمات امنیتی" />
          </Box>
        </Box>

        <Box
          padding="20px 15px"
          marginTop="10px"
          boxShadow="base"
          rounded="sm"
          bg="white"
          onClick={e => {
            history.push(`/dashboard/mobile-referral`);
          }}
        >
          <Box>
            <P text="دعوت دوستان" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { UserProfile };
