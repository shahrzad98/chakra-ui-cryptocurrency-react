/*
 *
 * DepositWithdraw
 *
 */

import React from 'react';

import {
  Box,
  Flex,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from '@chakra-ui/react';
import 'react-tabs/style/react-tabs.css';
import HistoryTicketHeader from 'components/ticket/HistoryTicketHeader';
import { useHistory } from 'react-router';
import HasProblem from 'components/ticket/HasProblem';
import { RightSideIcon, TicketIcon, ArrowBack } from '../../../images/icon';

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function detailTicket(props: Props) {
  const history = useHistory();

  return (
    <>
      <Box margin="0 auto" width={['100%', '100%', '100%', '100%', '80%', '1120px']}>
        <Box padding={{ sm: '16px', xl: '0' }} width={['100%', '100%', '100%', '100%', '100%', '1120px']}>
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
          <Box background="#fff" padding="0 24px 28px 24px">
            <Flex alignItems="center">
              <Text color="#233a7d" fontSize={{ base: '14px', xl: '16px' }} padding="18px 0 18px 0">
                احراز هویت
              </Text>
              <Spacer />
              <Text
                cursor="pointer"
                onClick={e => {
                  history.push(`/dashboard/ticket/`, {
                    state: 'category',
                  });
                }}
                color="#1650e9"
                fontSize={{ base: '10px', xl: '12px' }}
                textDecoration="underline"
              >
                تغییر موضوع
              </Text>
            </Flex>
            <Accordion border="0" allowToggle>
              <AccordionItem border="0">
                <AccordionButton
                  _hover={{ background: '#f4f9ff' }}
                  height={{ base: '50px', xl: '62px' }}
                  border="1px solid #dbe3f1"
                  borderRadius="3px"
                >
                  <Box flex="1" textAlign="right">
                    <Text color="#233a7d" fontSize={{ base: '12px', xl: '14px' }}>
                      چگونه احراز هویت کنم؟
                    </Text>
                  </Box>
                  <AccordionIcon color="#233a7d" />
                </AccordionButton>

                <AccordionPanel
                  pb={4}
                  borderBottom="1px solid #dbe3f1"
                  borderRight="1px solid #dbe3f1"
                  borderLeft="1px solid #dbe3f1"
                >
                  <Text
                    textAlign="justify"
                    lineHeight="35px"
                    fontFamily="yekan"
                    fontSize={{ base: '12px', xl: '14px' }}
                    color="#050f19"
                  >
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                    و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                    کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                    آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                    ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                  </Text>
                  <Box dir="ltr">
                    <Box
                      alignItems="center"
                      height="28px"
                      display="inline-flex"
                      background="rgba(138, 159, 247,0.28)"
                      borderRadius="20px"
                      cursor="pointer"
                    >
                      <Box paddingLeft="8px">
                        <RightSideIcon />
                      </Box>
                      <Text
                        onClick={e => {
                          history.push(`/dashboard/ticket/faq`);
                        }}
                        padding="0 10px"
                        color="#233a7d"
                        fontSize={{ base: '10px', xl: '12px' }}
                      >
                        توضیحات بیشتر
                      </Text>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem marginTop="8px" border="0">
                <AccordionButton
                  _hover={{ background: '#f4f9ff' }}
                  height={{ base: '50px', xl: '62px' }}
                  border="1px solid #dbe3f1"
                  borderRadius="3px"
                >
                  <Box flex="1" textAlign="right">
                    <Text color="#233a7d" fontSize={{ base: '12px', xl: '14px' }}>
                      چگونه احراز هویت کنم؟
                    </Text>
                  </Box>
                  <AccordionIcon color="#233a7d" />
                </AccordionButton>

                <AccordionPanel
                  pb={4}
                  borderBottom="1px solid #dbe3f1"
                  borderRight="1px solid #dbe3f1"
                  borderLeft="1px solid #dbe3f1"
                >
                  <Text
                    textAlign="justify"
                    lineHeight="35px"
                    fontFamily="yekan"
                    fontSize={{ base: '12px', xl: '14px' }}
                    color="#050f19"
                  >
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                    و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                    کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                    آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                    ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                  </Text>
                  <Box dir="ltr">
                    <Box
                      alignItems="center"
                      height="28px"
                      display="inline-flex"
                      background="rgba(138, 159, 247,0.28)"
                      borderRadius="20px"
                      cursor="pointer"
                    >
                      <Box paddingLeft="8px">
                        <RightSideIcon />
                      </Box>
                      <Text
                        onClick={e => {
                          history.push(`/dashboard/ticket/faq`);
                        }}
                        padding="0 10px"
                        color="#233a7d"
                        fontSize={{ base: '10px', xl: '12px' }}
                      >
                        توضیحات بیشتر
                      </Text>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <HasProblem />
        </Box>
      </Box>
    </>
  );
}

export default detailTicket;
