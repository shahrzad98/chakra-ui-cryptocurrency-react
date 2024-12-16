import * as React from 'react';

import {FC, useRef} from 'react';
import {Box, Flex, Text, Button} from '@chakra-ui/react';
import {FormattedMessage} from 'react-intl';
import messages from '../../messages';
import {useWindowSize} from 'helper/useWindowSize';
import ModalComponent from 'components/Modal';

import Carousel from 'components/Carousel';
import selfie from 'images/kyc/selfie/selfie.png';
import avatar1 from 'images/kyc/selfie/wrong1.png';
import avatar2 from 'images/kyc/selfie/wrong2.png';
import avatar3 from 'images/kyc/selfie/wrong3.png';
import avatar4 from 'images/kyc/selfie/wrong4.png';
import avatar5 from 'images/kyc/selfie/wrong5.png';
import Watermark from 'images/kyc/logo_1.svg';
import {useSelector} from 'react-redux';
import {kycSelector} from 'containers/KYC/redux/selector';

const objectTitle = {
  0: " هم پوشانی مدرک و متن تعهد نامه",
  1: " در دست نداشتن کارت شناسایی",
  2: " در دست نداشتن کارت شناسایی",
  3: " در دست نداشتن متن تعهد نامه",
  4: "  در دست نداشتن مدرک ارسالی و کارت شناسایی",
  5: " ناواضح و خوانا نبودن متن و مدرک ارسالی",
}

const SelfieBox: FC = () => {
  const {currentSlide} = useSelector(kycSelector);
  const {width} = useWindowSize();
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <>
      <ModalComponent background="#fff" modalRef={modalRef}>
        <Box
          margin={width > 768 ? "auto 35px" : "auto"}
          width={width > 768 ? '940px' : '100%'}
          height={width > 768 ? '695' : '305px'}>
          <Carousel imageSources={[avatar1, selfie, avatar2, avatar3, avatar4, avatar5]}/>
        </Box>
        <Flex
          className="documentInfo__selfieBox--title"
          width="100%"
          position={width > 768 ? 'absolute' : 'unset'}
          top={width > 768 ? '85%' : 'unset'}
          left={width > 768 ? '50%' : 'unset'}
          transform={width > 768 ? 'translateX(-50%)' : 'unset'}
        >
          {width > 768 && <Watermark width="140px"/>}
          <Flex
            justifyContent="center"
            alignItems="center"
            userSelect="none"
            width={width > 768 ? "fit-content" : "253px"}
            height={width > 768 ? "69px" : "90px"}
            margin={width < 768 ? '20px auto' : '0 auto'}
            padding={width > 768 ? " 20px 41px 19px" : "20px 13px"}
            borderRadius={width > 768 ? "35px" : "45px"}
            backgroundColor={currentSlide === 1 ? "rgba(9, 133, 81, 0.1)" : "rgba(233, 30, 99, 0.1)"}
            color={currentSlide === 1 ? "#0ecb81" : "#e91e63"}
            textAlign="center"
          >
            <p className="selfieBox__samplePicture--title" style={{color: currentSlide === 1 ? "#0ecb81" : "#e91e63"}}>
              {currentSlide === 1 ? "نمونه تصویر قابل قبول" :
                "نمونه تصویر غیر قابل قبول : "
              }
              {currentSlide !== 1 && <span>{objectTitle[currentSlide]}</span>}
            </p>
          </Flex>
          {width > 768 && <Watermark width="140px"/>}
        </Flex>

      </ModalComponent>
      <Flex position="relative" flexDirection={width < 900 ? 'column' : 'row'} background="#fafbfc" marginTop="25px"
            padding="29px 23px 26px 20px" h={{base: 'auto', md: '119px'}}>

        <Box>
          <Text fontSize="18px" color="#59636e" fontFamily="yekanb" marginBottom="4px">
            <FormattedMessage {...messages.commitmentWithSelfie} />
          </Text>
          <p className="typography">

            تصویر سلفی خود را در حالی که متن تعهد نامه رابکس

            <span>
               (که به صورت دست نویس روی کاغذ نوشته شده است)
            </span>
            و کارت شناسایی معتبر خود را در دست دارید ارسال کنید.
          </p>
        </Box>
        <Button
          height="46px"
          onClick={() => modalRef.current!.open()}
          margin="0 11px"
          marginTop={width < 768 ? '15px' : ''}
          background="rgba(0, 82, 255, 0.1)"
          _hover={{background: 'rgba(0, 82, 255, 0.1)'}}
          _active={{background: 'rgba(0, 82, 255, 0.1)'}}
          color="#1652f0"
          fontSize="14px"
          padding="13px 16px 12px 17px;"
          borderRadius="4px"
          position={width > 900 ? "absolute" : "unset"}
          left={width > 900 ? "10px" : "unset"}
          top={width > 900 ? "35px" : "unset"}
        >
          <FormattedMessage {...messages.selfieSample} />
        </Button>
      </Flex>
    </>
  );
};

export default SelfieBox;
