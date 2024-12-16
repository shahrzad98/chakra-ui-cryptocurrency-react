import {
  Text,
  Box,
  Flex,
  Button,
  List,
  ListItem,
  Icon,
  Image
} from '@chakra-ui/react';
import {useWindowSize} from 'helper/useWindowSize';
import * as React from 'react';
import {FC} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from '../messages'
import Watermark from 'images/kyc/watermark.svg'
import {ChevronLeftIcon} from '@chakra-ui/icons';
import Logo from 'images/kyc/logo_1.svg'
import {useHistory} from 'react-router-dom';
import {kycSelector} from 'containers/KYC/redux/selector';
import {useSelector} from 'react-redux';
import {api} from 'utils/network';
import {GetURL} from 'utils/urlMap';

type ConfirmPictureProps = {
  close?: () => void
};
const ConfirmPicture: FC<ConfirmPictureProps> = ({close}) => {
  const {width} = useWindowSize();
  const history = useHistory();
  const {imagePreview, documentInfo, personalInfo} = useSelector(kycSelector);

  function nextStepHandle() {
    const  updateDocumentInfo = api.put(GetURL('document-name-upload'), {
      selfie_file: documentInfo,
      id_desc_file: ""
    })
    const updatePersonalInfo = api.put(GetURL('kyc-base-info'), personalInfo)
    Promise.all([updatePersonalInfo, updateDocumentInfo]).then(() => history.push('/kyc/landline'))
  }

  return (
    <Flex flexDirection={width < 768 ? "column" : "row"} marginTop={width < 768 ? "12px" : "50px"}>
      <Box w={{base: '100%', md: '550px'}}>
        <Flex height={width < 768 ? "95px" : "80px"} width={width < 768 ? "300px" : "200px"}
              marginTop={width > 768 ? '85px' : 'unset'}
              flexDirection={width < 768 ? "row" : "column-reverse"} justifyContent="space-between" marginBottom="10px">
          <Text fontSize="26px" color="#1652f0" className="title" alignSelf="start"
                marginTop={width > 768 ? '50px' : 'unset'}>
            <FormattedMessage {...messages.confirmPicture} />
          </Text>
          <Box width="140px" height="95px" margin={width < 768 ? "unset" : "10px -10px"}>
            <Logo/>
          </Box>
        </Flex>

        <Text fontSize="20px" color="#59636e">
          <FormattedMessage {...messages.confirmPictureNote1} />
        </Text>
        <List className="confirmPicture__notes" spacing={3} color="#59636e" margin="10px 0"
              fontSize={width < 768 ? "14px" : "16px"} lineHeight="1.2">
          <ListItem>
            <Text>
              <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                <path
                  fill="currentColor"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
              <FormattedMessage {...messages.confirmPictureNote2} />
            </Text>
          </ListItem>
          <ListItem>
            <Text fontFamily="yekanb">
              <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                <path
                  fill="currentColor"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
              در دست داشتن کارت شناسایی معتبر:
              <span style={{fontFamily: 'yekan, sans-serif'}}>
                     کارت ملی جدید ، شناسنامه جدید، گواهی نامه، پایان خدمت.
               </span>
            </Text>

          </ListItem>
          <ListItem>
            <Text>
              <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                <path
                  fill="currentColor"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
              <FormattedMessage {...messages.confirmPictureNote4} />
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                <path
                  fill="currentColor"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
              <FormattedMessage {...messages.confirmPictureNote5} />
            </Text>
          </ListItem>
          <ListItem>
            <Text fontFamily="yekan">
              <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                <path
                  fill="currentColor"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
              <FormattedMessage {...messages.confirmPictureNote6} />
            </Text>
          </ListItem>
        </List>
      </Box>

      <Box textAlign="center" w={{base: '100%', md: '389px'}} marginRight={width < 768 ? "unset" : "80px"}>
        <Box className="confirmPicture__image--logo" w={{base: '100%', lg: '389px'}} h={{base: '100%', lg: '391px'}}>
          {documentInfo &&
          <Image width="100%" maxHeight="391px" src={URL.createObjectURL(imagePreview)} borderRadius="16px"/>}
          {width > 768 && <Watermark width="119.922" height="144.303"/>}
        </Box>

        <Flex flexDirection={width < 768 ? 'column' : 'row-reverse'} alignItems="center">
          <Button onClick={nextStepHandle} w={{base: "265px", lg: "227px"}} height="57px"
                  background="#1652f0" borderRadius="4px"
                  color="#fff" _hover={{background: "#1652f0"}} padding="17px 33.1px 16px 33px"
                  marginBottom={width < 768 ? "16px" : "0"}>
            <FormattedMessage {...messages.goNextStep} />
            <ChevronLeftIcon fontSize="25px" fontWEight={900} position="relative" top="-1px"/>
          </Button>
          <Button onClick={close} w={{base: "265px", lg: "150px"}} height="57px" background="#788ca6" borderRadius="4px"
                  marginLeft={width < 768 ? '0' : '12px'}
                  color="#fff" _hover={{background: "#788ca6"}} padding="17px 33.1px 16px 33px">
            <FormattedMessage {...messages.editPicture} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ConfirmPicture;
