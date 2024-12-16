/*
 *
 * DepositWithdraw
 *
 */

import React from 'react';
import { Box, Text, Flex, Spacer } from '@chakra-ui/react';
import 'react-tabs/style/react-tabs.css';
import HistoryTicketHeader from 'components/ticket/HistoryTicketHeader';
import { useHistory } from 'react-router';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import HasProblem from 'components/ticket/HasProblem';
import { TicketIcon, ArrowBack } from '../../../images/icon';
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FAQ(props: Props) {
  const history = useHistory();

  return (
    <>
      <Box margin="0 auto" width={['100%', '100%', '100%', '100%', '80%', '1120px']}>
        <Box width={['100%', '100%', '100%', '100%', '100%', '1120px']}>
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

          <HistoryTicketHeader />
          <Box background="#fff" padding="19px 24px">
            <Flex>
              <Text textAlign="right" color="#233a7d" fontSize={{ base: '14px', xl: '16px' }}>
                چگونه احراز هویت کنم؟
              </Text>
              <Spacer />
              <Text
                onClick={e => {
                  history.push(`/dashboard/ticket/`, {
                    state: 'category',
                  });
                }}
                color="#1650e9"
                fontSize={{ base: '10px', xl: '12px' }}
                cursor="pointer"
                textDecoration="underline"
              >
                تغییر موضوع
              </Text>
            </Flex>
            <Text
              textAlign="justify"
              marginTop="15px"
              fontSize={{ base: '12px', xl: '16px' }}
              color="#050f19"
              fontFamily="yekan"
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
              متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
              متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت
              فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
              طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود
              در ارائه راهکارها و ش
            </Text>
          </Box>
          <HasProblem />
        </Box>
      </Box>
    </>
  );
}

export default FAQ;
