import React, { useEffect, useState, Component, useRef } from 'react';
import P from '../../../../components/P';
import Img from '../../../../components/Img';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import { Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import { useToast } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Calendar } from 'react-multi-date-picker';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle';
import 'swiper/components/navigation/navigation.min.css';
import { ArrowLeftSlider, ArrowRightSlider } from '../../../../images/icon';
import SwiperCore, { Navigation } from 'swiper/core';
import { useHistory } from 'react-router-dom';

const StepEleven = ({ currentStep, onNextStep }) => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [rendezvous_time, setRendezvousTime] = useState('');

  const handleDragStart = e => e.preventDefault();
  const [items, setItems] = useState([]);

  const responsive = {
    0: { items: 3 },
    568: { items: 4 },
    1024: { items: 6 },
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const [activeKey, setActiveKey] = useState(0);
  const historyUrl = useHistory();
  const fetchSlider = calendar => {};

  // impersonate_user_id
  const validate = () => {
    if (history?.state?.state?.landLineNumber == null) historyUrl.push(`/kyc/authorization/6`);
    api
      .put(GetURL('auth-landing-line'), {
        landline_number: history?.state?.state?.landLineNumber,
        impersonate_user_id: null,
        rendezvous_slot: parseInt(selectedSlot.slotId),
        rendezvous_time: rendezvous_time,
      })
      .then(response => {
        onNextStep(currentStep + 1);
        toastIdRef.current = toast({
          description: 'زمان انتخابی شما ثبت شد',
          status: 'success',
        });
      })
      .catch(err => {
        toastIdRef.current = toast({
          description: 'زمان انتخابی شما ثبت نشد',
          status: 'error',
        });
      });
  };
  const [currentDate, setCurrentDate] = useState([]);

  useEffect(() => {
    var currentdate = new Date();
    setCurrentDate(currentdate.getFullYear() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getDate());
    setCurrentHours(currentdate.getHours());
  }, []);

  useEffect(() => {
    getCalender();
  }, []);

  const [calendarTime, setCalendarTime] = useState(new Array());
  const [dateBoxColor, setDateBoxColor] = useState();
  const [availableHours, setAvailableHours] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState({
    day: 0,
    slotId: 0,
  });

  const [calendarRealDate, setCalendarRealDate] = useState([]);
  const [currentHours, setCurrentHours] = useState([]);

  const getCalender = () => {
    api.get(GetURL('calender-reserve-time')).then(response => {
      selectDay(0, response?.data);
      setCalendarTime(response?.data);
      if (response?.data[0]) {
        setAvailableHours(response?.data[0]?.timetable);
      }

      api.get(GetURL('auth-step-three')).then(res => {
        var day = res.data.landline_batch_data?.rendezvous_time;
        const propOwn = Object.getOwnPropertyNames(response?.data);
        for (let i = 0; i < propOwn.length; i++) {
          if (response?.data[i].real_date == day) {
            var d = new Date(response?.data[i].real_date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
            slickRef.current?.slickGoTo(i);
            setCalendarRealDate(year + '/' + month + '/' + day);

            setRendezvousTime(res.data.landline_batch_data.rendezvous_time);
            setSelectedSlot({
              ...setSelectedSlot,
              day: i,
              slotId: res.data.landline_batch_data.rendezvous_slot,
            });
            setAvailableHours(response?.data[i].timetable);
          }
        }
      });
    });
  };
  const setActive = key => {
    setActiveKey(key);
    return true;
  };
  const selectDay = (key, calendar) => {
    if (setActive(key))
      setTimeout(() => {
        setHourse(key, calendar);
      }, 100);
  };

  const setHourse = (key, calendar) => {
    var d = new Date(calendar[key]?.real_date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    setCalendarRealDate(year + '/' + month + '/' + day);
    setRendezvousTime(calendar[key]?.real_date);
    setSelectedSlot({ ...setSelectedSlot, day: key });
    setAvailableHours(calendar[key]?.timetable);
  };

  const slickRef = useRef();

  const gotoNext = () => {
    const key = parseInt(selectedSlot.day);
    selectDay(key + 1);
  };

  const goBack = () => {
    const key = parseInt(selectedSlot.day);
    if (key > 0) selectDay(key - 1);
  };

  // install Swiper modules
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <Text
        marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '30px' }}
      >
        {<FormattedMessage {...messages.timeLandingPhone} />}
      </Text>
      <Box
        dir="ltr"
        textAlign="center"
        bg="white"
        margin="auto"
        overflow="hidden"
        padding={{ xl: '46px 30px 26px 30px', base: '24px 13px 24px 13px' }}
        w={{ base: '98%', xl: '580px' }}
        boxShadow="base"
        rounded="md"
      >
        <Text textAlign="center" fontSize={{ base: '12px', xl: '16px' }} color="#050f19">
          {<FormattedMessage {...messages.timeLandingPhoneText} />}
        </Text>

        <Box marginTop="18px" position="relative">
          <Flex w="100%" transform="translateY(-50%)" justifyContent="space-between" position="absolute" top="50%">
            <span ref={nextRef}>
              <ArrowLeftSlider />
            </span>
            <Spacer />
            <span ref={prevRef}>
              <ArrowRightSlider />
            </span>
          </Flex>
          <Box padding="0 30px">
            <Swiper
              className="swiperpadding"
              dir="rtl"
              onInit={swiper => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation
              // centeredSlides
              breakpoints={{
                '0': {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                '640': {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                '768': {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                '1024': {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
              }}
            >
              {Object.keys(calendarTime)?.map((key, index) => {
                return (
                  <SwiperSlide>
                    <Box key={key}>
                      <Tooltip label={calendarTime[key].values[0]?.occasion} aria-label="A tooltip">
                        <Box
                          margin="auto"
                          display="flex"
                          alignItems="center"
                          bg={activeKey == key ? '#1652f0' : 'white'}
                          color={activeKey == key ? 'white' : '#050f19'}
                          textAlign="center"
                          style={dateBoxColor}
                          onClick={e => {
                            selectDay(key, calendarTime);
                          }}
                          height={{ base: '50px', xl: '80px' }}
                          padding="0 8px"
                          border="1px solid #ECEFF1"
                        >
                          <Text fontFamily="yekan" fontSize={{ base: '10px', xl: '14px' }}>
                            {calendarTime[key].formatted_date.slice(0, -6)}
                          </Text>
                        </Box>
                      </Tooltip>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Box>

        <Box id="boxhours" margin="auto" textAlign="center" marginTop="15px" minHeight="312px" padding="0 30px">
          {availableHours
            ? Object.keys(availableHours)?.map(key => {
                return (
                  <Box
                    bg={selectedSlot.slotId == key ? '#1652f0' : ''}
                    margin="4px 0"
                    height={{ base: '36px', xl: '60px' }}
                    border="1px solid #ECEFF1"
                    key={key}
                    textAlign="left"
                  >
                    <Box
                      textAlign="right"
                      height={{ base: '36px', xl: '60px' }}
                      display="flex"
                      padding="0"
                      margin="-1px"
                      justifyContent="space-between"
                      alignItems="center"
                      disabled={availableHours[key].available ? '' : '[disabled]'}
                      bg={availableHours[key].available ? '' : '#f5f7f7'}
                      onClick={e => setSelectedSlot({ ...selectedSlot, slotId: key })}
                      color={availableHours[key].available && selectedSlot.slotId == key ? 'white' : '#708599'}
                    >
                      <Text
                        textAlign="left"
                        paddingLeft="17px"
                        display="inline-block"
                        color="#0667d0"
                        fontSize={{ base: '12px', xl: '15px' }}
                      >
                        {availableHours[key].available ? '' : 'تکمیل ظرفیت'}
                      </Text>
                      <Text
                        paddingRight="31px"
                        color={availableHours[key].available && selectedSlot.slotId == key ? 'white' : '#708599'}
                        fontSize={{ base: '12px', xl: '15px' }}
                      >
                        ساعت {` ${availableHours[key].start} -  ${availableHours[key].end}`}
                      </Text>
                    </Box>
                  </Box>
                );
              })
            : null}
        </Box>

        <Button
          background="#1652f0"
          color="#fff"
          width={{ base: '100%', xl: '100%' }}
          height={{ base: '47px', xl: '60px' }}
          marginTop={{ xl: '27px', base: '17px' }}
          fontSize={{ base: '11px', xl: '22px' }}
          _active={{ background: '#1652f0' }}
          _hover={{ background: '#1652f0' }}
          onClick={e => {
            validate();
          }}
        >
          {<FormattedMessage {...messages.Continues} />}
        </Button>
      </Box>
    </>
  );
};

export default StepEleven;
