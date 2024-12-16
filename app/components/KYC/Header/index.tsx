import {Box, Image, Button, Flex, Text} from '@chakra-ui/react';
import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import './kycHeader.scss'
import LogoMobile from 'images/kyc/logo_2.png'
import LogoDesktop from 'images/kyc/logo_desktop.png'
import Logo from 'images/kyc/logo_3.svg'
import {useWindowSize} from 'helper/useWindowSize';
import {FormattedMessage} from 'react-intl';
import messages from '../messages'
import ArrowLeft from 'images/kyc/arrowLeft.svg';
import BackgroundArt from 'images/kyc/background_art.svg'
import {api} from 'utils/network';
import {GetURL} from 'utils/urlMap';
import {Link, useHistory} from 'react-router-dom';

type KYCHeaderProps = {};
const KYCHeader: FC<KYCHeaderProps> = () => {
  const {width} = useWindowSize();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    api
      .get(GetURL('users-profile-info'))
      .then(response => {
        setUserInfo(response?.data);
      })
  }, []);

  return (
    <>
      <Box width="100%" className="kyc__header">
        <Box position="relative" w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}} margin="0 auto">

          <Flex className="kyc__header--logo"
                justifyContent="center" alignItems="center">
            <Box w={width > 768 ? "105px" : "75px"} height={width > 768 ? "125px" : "85px"} marginTop="17px"
            >
              <Logo width="100%" height="100%"/>
            </Box>
          </Flex>

          <Button
            position="absolute"
            top={width > 768 ? "50%" : "30%"} right={0}
            display="flex"
            background="rgba(255, 255, 255, 0.17)"
            _hover={{background: "rgba(255, 255, 255, 0.17)"}}
            _active={{background: "rgba(255, 255, 255, 0.17)"}}
            w={{base: "44px", md: "162px", lg: "162px"}}
            height="46px"
            padding={"10px"}
            color="#fff"
            fontSize="14px"
            justifyContent="space-evenly"
          >
            <ArrowLeft onClick={()=> history.push('/dashboard')}/>
            <Link to="/dashboard">
              {width > 768 &&
              <Text _hover={{color: "#fff"}} position="relative" top="2px"><FormattedMessage {...messages.backToDashboard} /></Text>}
            </Link>
          </Button>

          {width > 768 ?
            <Box position="absolute" top="50%" left={0}>
              <Image src={LogoDesktop}/>
            </Box> : <Image src={LogoMobile} position="absolute" top={width > 768 ? "50%" : "30%"}
                            left={width > 768 ? 0 : "10px"}/>
          }
        </Box>
        <Box textAlign="center">
          <Box position="relative">
            <Flex justifyContent="center" marginBottom="5px">
              <Text margin="0 15px" color="#fff" fontSize="30px" fontWeight="900">|</Text>
            </Flex>
            <Text fontFamily="yekanb" fontSize={width > 768 ? "28px" : "22px"} color="#fff" position="absolute"
                  top={width > 768 ? "0" : "5px"} right={width > 768 ? "51%" : "52%"}>
              {userInfo && userInfo?.base_info.first_name + ' ' + userInfo?.base_info.last_name}
            </Text>
            <Text fontFamily="yekanb" fontSize={width > 768 ? "28px" : "22px"} color="#fff" position="absolute"
                  top={width > 768 ? "0" : "5px"} left={width > 768 ? "51%" : "52%"}>
              <FormattedMessage {...messages.kyc} />
            </Text>
          </Box>
          <p className="typography">
            برای احراز هویت ، مراحل زیر
            {width < 768 && <br/>}
            <span className="dotted-gradient">
              (مشخصات فردی، مدارک هویتی، کارت های بانکی و تلفن ثابت)
              </span>
            را با دقت کامل کنید و در آخر دکمه
            {width < 768 && <br/>}
            <span className="dotted-gradient"> تایید و ارسال به کارشناس </span>

            را بزنید .

          </p>

        </Box>
        <Box height="250px" className="kyc__header--art">
          <BackgroundArt/>
        </Box>
      </Box>
    </>

  );
};

export default KYCHeader;
