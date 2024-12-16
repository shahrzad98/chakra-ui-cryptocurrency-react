import React, { useEffect, useState } from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import UploadFile from '../../../../components/UploadFile/index.tsx';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  useToast,
  Text,
  Button,
  Flex,
  Checkbox,
  Spacer,
} from '@chakra-ui/react';
import { UploadDocument, UploadSelfie, Exclusion, FileText } from '../../../../images/icon';

const StepSeven = ({ currentStep, onNextStep }) => {
  const [size, setSize] = useState('xl');
  const [state, setState] = useState('1');
  const [upload, setUpload] = useState(false);

  const [document_image, setDocumentImage] = useState('');
  const [selfie_image, setSelfieImage] = useState('');
  const [id_desc_file, setDescFile] = useState('');

  const [show_document_image, setShowDocumentImage] = useState('');
  const [show_selfie_image, setShowSelfieImage] = useState('');
  const [show_id_desc_file, setShowDescFile] = useState('');

  const [documentCheck, setDocumentCheck] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSizeClick = state => {
    setState(state);
  };

  useEffect(() => {
    api.get(GetURL('auth-step-three')).then(response => {
      if (response.data?.documents_batch_data != null && response.data?.documents_batch_data?.docs_file != '') {
        setDocumentImage(response?.data?.documents_batch_data?.docs_file);
        setSelfieImage(response?.data?.documents_batch_data?.selfie_file);
        api
          .post(GetURL('get-documents-batch') + '/' + response?.data?.documents_batch_data?.docs_file)
          .then(response => {
            setShowDocumentImage(response.data);
            setShowDocuments(true);
          });

        api
          .post(GetURL('get-documents-batch') + '/' + response?.data?.documents_batch_data?.selfie_file)
          .then(response => {
            setShowSelfieImage(response.data);
          });

        api
          .post(GetURL('get-documents-batch') + '/' + response?.data?.documents_batch_data?.id_desc_file)
          .then(response => {
            setShowDescFile(response.data);
            setShowDesc(true);
          })
          .catch(err => {
            setDescFile('');
          });
      }
    });
  }, []);

  const submit = () => {
    // if (document_image == 'up' && selfie_image == 'up')
    setUpload(true);
    // if (document_image != '' || selfie_image != '') {

    api
      .put(GetURL('document-name-upload'), {
        selfie_file: selfie_image,
        docs_file: document_image,
        id_desc_file: id_desc_file,
      })
      .then(response => {
        onNextStep(currentStep + 1);
      });

    // if (document_image == '' && selfie_image == '' && show_selfie_image != '') {
    //   onNextStep(currentStep + 1);
    // }
  };
  const [showDocuments, setShowDocuments] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);
  const [ShowDesc, setShowDesc] = useState(false);

  return (
    <>
      <Text
        marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '30px' }}
      >
        {<FormattedMessage {...messages.identificationDocuments} />}
      </Text>
      <Box
        bg="#fff"
        w={{ base: '96%', xl: '480px' }}
        padding={{ base: '28px 20px 22px 20px', xl: '48px 31px 26px 24px' }}
        boxShadow="sm"
        borderRadius="4px"
        margin="0 auto"
      >
        <Text textAlign={{ xl: 'right', base: 'center' }} fontSize={{ xl: '16px', base: '15px' }} color="#050f19">
          <FormattedMessage {...messages.SelfiePhotoAndIdentificationDocuments} />
        </Text>
        <Text
          textAlign={{ xl: 'right', base: 'center' }}
          marginTop="11pxpx"
          fontFamily="yekan"
          fontSize={{ base: '13px', xl: '16px' }}
          color="#050f19"
        >
          <FormattedMessage {...messages.Donotedityourphoto} />
        </Text>

        <Text
          textAlign={{ xl: 'right', base: 'center' }}
          marginTop="4px"
          fontFamily="yekan"
          fontSize={{ base: '13px', xl: '16px' }}
          color="#050f19"
        >
          <FormattedMessage {...messages.hdphoto} />
        </Text>

        <Text
          textAlign={{ xl: 'right', base: 'center' }}
          marginTop="4px"
          fontFamily="yekan"
          fontSize={{ base: '13px', xl: '16px' }}
          color="#050f19"
        >
          <FormattedMessage {...messages.nothdphoto} />
        </Text>

        <Box margin="20px auto 0 auto" display="flex" justifyContent="center" textAlign="center">
          <Box marginRight="20px" width={{ xl: '152px', base: '122px' }} height={{ xl: '152px', base: '122px' }}>
            <UploadFile
              name="document"
              upload={true}
              icon={<UploadSelfie />}
              placeholder={
                <Box
                  background="#1650e9"
                  margin="0 auto"
                  color="#fff"
                  borderRadius="3px"
                  lineHeight="30px"
                  fontSize="10px"
                  height="26px"
                  w="72px"
                >
                  انتخاب تصویر
                </Box>
              }
              onLoad={response => {
                setDocumentImage(response);
              }}
            />
            <Text marginTop="11px" fontFamily="yekan" fontSize={{ xl: '15px', base: '13px' }} color="#050f19">
              <FormattedMessage {...messages.Selfiewithdocuments} />
            </Text>
          </Box>

          <Spacer />

          <Box marginLeft="20px" width={{ xl: '152px', base: '122px' }} height={{ xl: '152px', base: '122px' }}>
            <UploadFile
              name="selfie"
              upload={true}
              icon={<UploadDocument />}
              placeholder={
                <Box
                  background="#1650e9"
                  margin="0 auto"
                  color="#fff"
                  borderRadius="3px"
                  lineHeight="30px"
                  fontSize="10px"
                  height="26px"
                  w="72px"
                >
                  انتخاب تصویر
                </Box>
              }
              onLoad={response => {
                setSelfieImage(response);
              }}
            />
            <Text marginTop="11px" fontFamily="yekan" fontSize={{ xl: '15px', base: '13px' }} color="#050f19">
              <FormattedMessage {...messages.Photoofdocuments} />
            </Text>
          </Box>
        </Box>

        <Box marginTop={{ xl: '80px', base: '90px' }}>
          <Flex onClick={onOpen}>
            <Exclusion />
            <Text marginRight="7px" fontSize="12px" color="#1650e9" fontFamily="yekan">
              مشاهده متن تعدنامه
            </Text>
          </Flex>

          <Box>
            <Checkbox
              marginTop="7px"
              onChange={e => {
                setDocumentCheck(e.target.checked);
              }}
              addon
            >
              <Text fontSize={{ base: '12px', xl: '14px' }} textAlign="right" fontFamily="yekan">
                شناسنامه ام دارای توضیحات است
              </Text>
            </Checkbox>
          </Box>

          <Box
            margin="10px auto 0 auto"
            display={documentCheck ? 'block' : 'none'}
            textAlign="center"
            w="152px"
            height="151px"
          >
            <UploadFile
              name="desc"
              upload={true}
              icon={<UploadDocument />}
              placeholder={
                <Box
                  background="#1650e9"
                  margin="0 auto"
                  color="#fff"
                  borderRadius="3px"
                  lineHeight="30px"
                  fontSize="10px"
                  height="26px"
                  w="72px"
                >
                  انتخاب تصویر
                </Box>
              }
              onLoad={response => {
                setDescFile(response);
              }}
            />
            <Text fontFamily="yekan" marginTop="13px" fontSize="14px" color="#050f19">
              <FormattedMessage {...messages.Birthcertificate} />
            </Text>
          </Box>

          <Box
            marginTop={documentCheck ? '55px' : '12px'}
            background="rgba(138,168,247,0.1)"
            lineHeight="50px"
            color="#050f19"
          >
            <Text textAlign="center" lineHeight="25px" fontSize={{ xl: '14px', base: '12px' }} fontFamily="yekan">
              <FormattedMessage {...messages.sendPhoto} />
            </Text>
          </Box>
          <Button
            marginTop={{ xl: '26px', base: '20px' }}
            textAlign="center"
            width="100%"
            height="50px"
            background="#1652F0"
            _hover={document_image == '' || selfie_image == '' ? '#8aa8f7' : '#1652F0'}
            _active={document_image == '' || selfie_image == '' ? '#8aa8f7' : '#1652F0'}
            color="#fff"
            borderRadius="4px"
            onClick={submit}
          >
            {<FormattedMessage {...messages.nextStep} />}
          </Button>
        </Box>
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box margin="10px auto 25px auto" w="54px" height="58px">
              <FileText />
            </Box>
            <Text textAlign="center" color="#050f19" fontFamily="yekan">
              اینجانب (نام و نام خانوادگی) به کد ملی (کدملی) و به شماره شناسنامه (شماره شناسنامه) ضمن مطالعه و تأیید و
              اجرای قوانین استفاده از خدمات سایت رابکس، متعهد می گردم حساب کاربری و حساب بانکی ارائه شده به سایت رابکس
              را عمدا یا سهوا در اختیار اشخاص غیر قرار ندهم و همچنین رمزارزهای خریداری شده را صرفا برای اهداف قانونی و
              مشروع مورد استفاده قرار دهم و در غیر این صورت، مسئولیت کیفری و حقوقی هرگونه جرم یا تخلف وقوع یافته و جبران
              خسارات وارده به هر شخص حقیقی و حقوقی دیگر، بر عهده اینجانب است. جهت احراز هویت و ارائه تعهد به سایت رابکس
              - تاریخ روز و امضا
            </Text>
          </ModalBody>

          <ModalFooter textAlign="center" margin="0 auto">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              بستن
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StepSeven;
