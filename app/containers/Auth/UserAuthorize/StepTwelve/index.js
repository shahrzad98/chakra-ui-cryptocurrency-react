import React, { useEffect, useState, useRef } from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Img from '../../../../components/Img';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import { Link } from 'react-router-dom';
import {
  useDisclosure,
  Box,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Stack,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { EditMaterial, Eye } from '../../../../images/icon';
import BaseInformationForm from 'components/AuthBaseInformationForm';
import { DocumentIcon, SelfieIcon, TelephoneTwoIcon } from '../../../../images/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle';
import { ArrowLeftSlider, ArrowRightSlider } from '../../../../images/icon';
import SwiperCore, { Navigation } from 'swiper/core';

const StepTwelve = ({ currentStep, onNextStep }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  const toast = useToast();
  const toastIdRef = React.useRef();
  const submitDocs = () => {
    api
      .put(GetURL('griffin-kyc-submit'), {})
      .then(response => {
        onNextStep(currentStep + 1);
        toastIdRef.current = toast({
          description: 'مشخصات و مدارک شما ثبت گردید',
          status: 'success',
        });
      })
      .catch(err => {
        toastIdRef.current = toast({
          description: 'اطلاعات شما ثبت نشد',
          status: 'error',
        });
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: isOpenPhoto, onOpen: onOpenPhoto, onClose: onClosePhoto } = useDisclosure();

  const [photoUser, setPhotoUser] = useState();
  const [photoUser2, setPhotoUser2] = useState();

  const [landLineNumber, setLandLineNumber] = useState();
  const [landLineDate, setLandLineDate] = useState();
  const [landLineSlot, setLandLineSlot] = useState();

  useEffect(() => {
    api.get(GetURL('auth-step-three')).then(response => {
      setLandLineNumber(response.data?.landline_batch_data?.landline_number);
      let date = response.data?.landline_batch_data?.calendar?.formatted_date?.split(',');
      if(date !== undefined)
      setLandLineDate(date[0]);

      let slot = response.data?.landline_batch_data?.rendezvous_slot;

      let time = response.data?.landline_batch_data?.calendar.timetable[slot];
      if(time !== undefined)
      setLandLineSlot(time.start + '-' + time.end);
      // if (response?.data?.documents_batch_data?.selfie_file) {
      //   api
      //     .post(GetURL('get-documents-batch') + '/' + response.data?.documents_batch_data.selfie_file)
      //     .then(response => {
      //       setPhotoUser(response.data);
          
      //     });
      // }

      // if (response?.data?.documents_batch_data?.docs_file) {
      //   api.post(GetURL('get-documents-batch') + '/' + response.data?.documents_batch_data.docs_file).then(response => {
      //     setPhotoUser2(response.data);
      //   });
      // }
    });
  }, []);
  SwiperCore.use([Navigation]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <Text
        marginTop={{ base: '28px', xl: '92px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '30px' }}
      >
        {<FormattedMessage {...messages.sendAuthForExperts} />}
      </Text>
      <Box
        textAlign="center"
        bg="white"
        padding={{ base: '23px 30px 20px 30px', xl: '48px 30px 26px 30px' }}
        margin="auto"
        w={{ base: '94%', xl: '480px' }}
        borderRadius="4px"
        
      >
        <Text color="#050f19" fontSize={{ base: '14px', xl: '16px' }}>
          {<FormattedMessage {...messages.Sendtoexpert} />}
        </Text>

        <Flex
          marginTop={{ base: '20px', xl: '33px' }}
          border="1px solid #eceff1"
          padding={{ xl: '0 30px 0 21px', base: '26px 14px 22px 16px' }}
          height={{ base: '67px', xl: '103px' }}
          textAlign="right"
          alignItems="center"
        >
          <DocumentIcon width="32" height="38" />

          <Text fontSize={{ base: '12px', xl: '13px' }} color="#050f19" marginRight="12px">
            {<FormattedMessage {...messages.PersonalProfile} />}
          </Text>
          <Spacer />
          <Button
            onClick={onOpen}
            color="#fff"
            width="80px"
            fontSize="10px"
            alignItems="center"
            borderRadius="4px"
            background="#1652F0"
            _active={{ background: '#1652F0' }}
            _hover={{ background: '#1652F0' }}
          >
            {<FormattedMessage {...messages.Edit} />}
          </Button>
        </Flex>

        <Flex
          border="1px solid #eceff1"
          textAlign="right"
          alignItems="center"
          padding={{ xl: '0 30px 0 21px', base: '26px 14px 22px 16px' }}
          height={{ base: '67px', xl: '103px' }}
          marginTop={{ base: '5px', xl: '10px' }}
          alignItems="center"
        >
          <SelfieIcon />
          <Text fontSize={{ base: '12px', xl: '14px' }} color="#050f19" marginRight="12px">
            {<FormattedMessage {...messages.sendingDocuments} />}
          </Text>

          <Spacer />
          {/* <Button
            onClick={onOpenPhoto}
            color="#fff"
            padding="10px"
            borderRadius="4px"
            background="#708599"
            alignItems="center"
            fontSize="10px"
            width="80px"
            _active={{ background: '#708599' }}
            _hover={{ background: '#708599' }}
          >
            {<FormattedMessage {...messages.View} />}
          </Button> */}
          <Link
            to={{
              pathname: '/kyc/authorization/4',
              state:  {upload: true}
            }}
          >
            <Button
              color="#fff"
              padding="0px 10px"
              borderRadius="4px"
              alignItems="center"
              fontSize="10px"
              width="80px"
              marginRight="12px"
              background="#1652F0"
              _active={{ background: '#1652F0' }}
              _hover={{ background: '#1652F0' }}
            >{<FormattedMessage {...messages.Edit} />}</Button>

          </Link>
        </Flex>

        <Flex
          border="1px solid #eceff1"
          textAlign="right"
          alignItems="center"
          padding={{ xl: '0 30px 0 21px', base: '26px 14px 22px 16px' }}
          height={{ base: '67px', xl: '103px' }}
          marginTop={{ base: '5px', xl: '10px' }}
        >
          <TelephoneTwoIcon />
          <Box verticalAlign="top" display="inline-block">
            <Text
              fontSize={{ base: '12px', xl: '14px' }}
              color="#050f19"
              marginRight="12px"
              
            >
              {landLineNumber}
            </Text>
            <Text
              marginRight="12px"
              fontSize={{ base: '9px', xl: '10px' }}
              fontFamily={{ base: 'yekanb', xl: 'yekan' }}
              color="#708599"
            >
              زمان انتخابی : {landLineDate} ساعت {landLineSlot}
            </Text>
          </Box>

          <Spacer />

          <Button
            display="inline"
            color="#fff"
            padding="0px 10px"
            borderRadius="4px"
            alignItems="center"
            fontSize="10px"
            background="#1652F0"
            _active={{ background: '#1652F0' }}
            _hover={{ background: '#1652F0' }}
            width="80px"
            onClick={e => {
              onNextStep(currentStep - 2);
            }}
          >
            {<FormattedMessage {...messages.Edit} />}
          </Button>
        </Flex>

        <Button
          marginTop={{ base: '25px', xl: '48px' }}
          background="#1652F0"
          _active={{ background: '#1652F0' }}
          _hover={{ background: '#1652F0' }}
          color="#fff"
          fontSize={{ base: '12px', xl: '17px' }}
          borderRadius="4px"
          padding="20px 0"
          height={{ base: '47px', xl: '60px' }}
          width={{ base: '263px', xl: '100%' }}
          onClick={e => {
            submitDocs();
          }}
        >
          {<FormattedMessage {...messages.SendToExpert} />}
        </Button>
      </Box>

      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent width="unset">
          <ModalCloseButton />
          <ModalBody dir="rtl" padding="0 !important">
            <BaseInformationForm onclose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal onClose={onClosePhoto} size="5xl" isOpen={isOpenPhoto}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader padding="0">
            {' '}
            <Text marginTop="28px" fontSize="36px" color="#050f19" textAlign="center">
              {<FormattedMessage {...messages.sendingDocuments} />}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="20px 69px 27px 69px" dir="rtl">
            <hr />

            <Stack direction={['column', 'row']} paddingBottom="40px">
              <Box w={'60%'}>
                <Text textAlign="right" marginTop="43px" fontSize="24px" color="#050f19">
                  {<FormattedMessage {...messages.Attention} />}
                </Text>
                <Text
                  textAlign="right"
                  lineHeight="36px"
                  marginTop="14px"
                  fontFamily="yekan"
                  fontSize="22px"
                  color="#050f19"
                >
                  {<FormattedMessage {...messages.validIdentificationDocument} />}
                </Text>

                <Text
                  textAlign="right"
                  lineHeight="36px"
                  marginTop="16px"
                  fontFamily="yekan"
                  fontSize="22px"
                  color="#050f19"
                >
                  {<FormattedMessage {...messages.validIdentificationDocumentText} />}
                </Text>

                <Text textAlign="right" marginTop="16px" fontFamily="yekan" fontSize="22px" color="#050f19">
                  {<FormattedMessage {...messages.DoNotPhotoshop} />}
                </Text>

                <Text
                  textAlign="right"
                  lineHeight="36px"
                  marginTop="16px"
                  fontFamily="yekan"
                  fontSize="22px"
                  color="#050f19"
                >
                  {<FormattedMessage {...messages.DontRotationPhoto} />}
                </Text>
              </Box>
              <Box w={'40%'} display="grid" marginTop="43px !important" gridTemplateAreas="'swiper''buttons'">
                <Flex marginTop="27px" gridArea="buttons">
                  <Flex alignItems="center" ref={prevRef}>
                    <ArrowRightSlider />
                    <Text color="#1652f0" fontSize="24px" marginRight="13px">
                      عکس قبلی
                    </Text>
                  </Flex>
                  <Spacer />
                  <Flex ref={nextRef} alignItems="center">
                    <Text color="#1652f0" fontSize="24px" marginLeft="13px">
                      عکس بعدی
                    </Text>
                    <ArrowLeftSlider />
                  </Flex>
                </Flex>
                <Swiper
                  dir="rtl"
                  style={{
                    maxWidth: '100%',
                    gridArea: 'swiper',
                  }}
                  onSlideChange={val => {
                    nextRef.current.style.display = val.isEnd ? 'none' : 'flex';
                    prevRef.current.style.display = val.isBeginning ? 'none' : 'flex';
                  }}
                  onInit={swiper => {
                    prevRef.current.style.display = 'none';
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                >
                  <SwiperSlide>
                    <Box>
                      <Img
                        textAlign="center"
                        margin="0 auto"
                        width="500px"
                        height="450px"
                        heightImg="450"
                        src={`data:image/png;base64,${photoUser}`}
                      />
                      -
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box>
                      <Img
                        textAlign="center"
                        margin="0 auto"
                        width="500px"
                        height="450px"
                        heightImg="450"
                        src={`data:image/png;base64,${photoUser2}`}
                      />
                    </Box>
                  </SwiperSlide>
                </Swiper>
              </Box>
              <Box borderBottom="1px solid #eceff1" />
            </Stack>
            <Box borderBottom="1px solid #eceff1" />

            <Flex>
              <Button
                height="97px"
                bg="#1652F0"
                fontSize="24px"
                textAlign="center"
                color="white"
                width="224px"
                marginRight="20px"
                borderRadius="4px"
                onClick={onClosePhoto}
              >
                <FormattedMessage {...messages.close} />
              </Button>

              <Button
                height="97px"
                bg="#708599"
                fontSize="24px"
                textAlign="center"
                color="white"
                width="224px"
                onClick={e => {}}
              >
                <FormattedMessage {...messages.Edit} />
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StepTwelve;
