import * as React from 'react';
import {FC} from 'react';
import {Alert, Box, Flex, Grid, GridItem, Icon, List, ListItem, Text} from '@chakra-ui/react';
import messages from '../../messages'
import {FormattedMessage} from 'react-intl';
import {ChevronLeftIcon} from '@chakra-ui/icons';
import {useWindowSize} from 'helper/useWindowSize';
import Upload from 'components/UploadFile';
import Avatar1 from 'images/kyc/kycman1.svg';
import Avatar2 from 'images/kyc/kycman2.svg';
import Placeholder from 'images/kyc/placeholder.svg';

type UploadDocumentProps = { imagePreview: string , status : number};
const UploadDocument: FC<UploadDocumentProps> = ({imagePreview , status}) => {
  const {width} = useWindowSize()

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} margin="16px 0">
      <GridItem gridColumn={{base: "span 2", lg: width < 1300 ? "span 2" : "span 1"}} >
        <Box w={{base: '100%', xl: '520px'}} background="#fafbfc" padding="33.3px 25px 30px 26px"
             textAlign="justify" lineHeight="1.7" marginBottom={width < 768 ? '27px' : 'unset'}>
          <Text color="#59636e" fontSize="18px" fontFamily="yekanb" marginBottom="3px">
            <FormattedMessage {...messages.commitment} />
          </Text>

          <p className="typography"  style={{fontSize: '16px'}}>
            اینجانب
            <span>
              (نام و نام خانوادگی )
            </span>
            به کد ملی
            <span>
              (کد ملی)
            </span>
            و به شماره شناسنامه
            <span>
              (شماره شناسنامه)
            </span>
            ضمن مطالعه و تأیید و اجرای قوانین استفاده از خدمات سایت رابکس، متعهد میگردم حساب کاربری و حساب بانکی ارائه
            شده به سایت رابکس را عمدا یا سهوا در اختیار اشخاص غیر قرار ندهم و همچنین رمزارزهای خریداری شده را صرفا برای
            اهداف قانونی و مشروع مورد استفاده قرار دهم و در غیر این صورت، مسئولیت کیفری و حقوقی هرگونه جرم یا تخلف وقوع
            یافته و جبران خسارات وارده به هر شخص حقیقی و حقوقی دیگر، بر عهده اینجانب است. جهت احراز هویت و ارائه تعهد به
            سایت رابکس - تاریخ روز و امضا
          </p>
        </Box>
        <Flex flexDirection={width < 991 ? "column" : "row"} marginTop={width < 991 ? "12px" : "100px"}
              justifyContent="space-around">
          <Box w={{base: "290px", lg: "251px"}} className="kyc__upload--avatar" background="#f4f7fa" height={width > 768 ? "172px" : "168px"}
               borderRadius="6px"
               position="relative" marginBottom="28px">
            <Text color="#0ecb81" fontSize="18px" fontFamily="yekanb">
              <FormattedMessage {...messages.validPicture} />
            </Text>
            <Avatar2/>
          </Box>
          <Box w={{base: "290px", lg: "251px"}} className="kyc__upload--avatar" background="#f4f7fa" height={width > 768 ? "172px" : "168px"}
               borderRadius="6px"
               position="relative">
            <Text color="#59636e" fontSize="18px" fontFamily="yekanb">
              <FormattedMessage {...messages.invalidPicture} />
            </Text>
            <Avatar1/>
          </Box>
        </Flex>


      </GridItem>
      <GridItem gridColumn={{base: "span 2", lg: width < 1300 ? "span 2" : "span 1"}}>
        <Box background={width > 991 ? "#fafbfc" : "unset"} padding={width > 991 ? "33px 32px 32px 27px" : "unset"}
             fontSize="18px" marginTop={width > 991 ? '0' : '4px'} textAlign="justify">
          <Text color="#59636e" fontSize="18px" fontFamily="yekanb" marginBottom="3px">
            <FormattedMessage {...messages.validDocument} />
          </Text>
          <Text color="#707070" fontSize="16px">
            <FormattedMessage {...messages.validDocumentText} />
          </Text>
          <Alert w={{base: "286px", lg: "452px"}} backgroundColor="rgba(255, 162, 0, 0.1)" marginTop="10px"
                 lineHeight={width < 768 ? '2' : 'unset'}
                 padding="11px 11.8px 12px 5px" borderRadius="6px">
            <ChevronLeftIcon boxSize="1.2rem" alignSelf="start"/>
            <Text color="#55401c" fontSize="14px" fontFamily="yekanb">
              <FormattedMessage {...messages.military} />
            </Text>
          </Alert>

          <Text color="#59636e" fontSize="18px" margin="20px 0" fontFamily="yekanb">
            <FormattedMessage {...messages.selfieUpload} />
          </Text>
          <Box h={{base: "227px", lg: "249px"}} w={{base: "286px", lg: "452px"}}>
            <Upload upload disabled={status === 4}  width="100%" height="100%" imagePreview={imagePreview} placeholder={
              <Box className="documentInfo__uplaodFile--placeholder">
                <Box marginTop="20px" marginBottom="14px">
                  <Placeholder/>
                </Box>
                <p className="typography--upload">
                  برای انتخاب تصویر،&nbsp;
                  <span style={{color: "#1652f0"}}>
                    کلیک&nbsp;
                  </span>
                  کنید.
                </p>
                <Text color="#7e8b9a" fontSize="13px" marginBottom="10px">
                  <FormattedMessage {...messages.maxPictureSize} />
                </Text>
                <Text color="#7e8b9a" fontSize="13px">
                  {width > 768 ? <FormattedMessage {...messages.pictureExtension} /> :
                    <FormattedMessage {...messages.pictureExtension1} />}
                </Text>
              </Box>
            }/>
          </Box>
          <List spacing={1} color="#788ca6" marginTop="20px">
            <ListItem w={{base: "240px", md: "100%"}}>
              <Text fontSize="14px">
                <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <FormattedMessage {...messages.pictureNote1} />
              </Text>
            </ListItem>
            <ListItem w={{base: "240px", md: "100%"}}>
              <Text fontSize="14px">
                <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <FormattedMessage {...messages.pictureNote2} />
              </Text>
            </ListItem>
            <ListItem w={{base: "240px", md: "100%"}}>
              <Text fontSize="14px">
                <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <FormattedMessage {...messages.pictureNote3} />
              </Text>
            </ListItem>
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default UploadDocument;
