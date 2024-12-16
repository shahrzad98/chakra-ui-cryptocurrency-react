import React, { useEffect, useState } from 'react';
import P from '../../../../components/P';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/RabexButton';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import { Link } from 'react-router-dom';
import {
  Box,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { TelephoneTwoIcon, SelfieIcon, DocumentIcon } from '../../../../images/icon';
import BaseInformationForm from 'components/AuthBaseInformationForm';

const StepThirteen = ({ currentStep, onNextStep }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [landLinePhone, setLandLinePhone] = useState();
  const [userClockSelected, setUserClockSelected] = useState();
  const [userStatus, setUserStatus] = useState();
  const [dateTimeSelected, setDateTimeSelected] = useState();

  const [personalProfileStatus, setPersonalProfileStatus] = useState();
  const [documentStatus, setDocumentStatuss] = useState();
  const [landLineStatus, setLandLineStatus] = useState();

  useEffect(() => {
    api.get(GetURL('auth-step-three')).then(response => {
      setPersonalProfileStatus(response.data?.base_info_batch?.status);
      setDocumentStatuss(response.data?.documents_batch?.status);
      setLandLineStatus(response.data?.landline_batch?.status);

      setLandLinePhone(response.data?.landline_batch_data?.landline_number);
      let slot = response.data?.landline_batch_data?.rendezvous_slot;
      setUserStatus(response.data?.status);
      setUserClockSelected(
        response.data?.landline_batch_data?.calendar?.timetable[slot]?.start +
          '-' +
          response.data?.landline_batch_data?.calendar?.timetable[slot]?.end,
      );

      setDateTimeSelected(response.data?.landline_batch_data?.calendar?.formatted_date?.split(',')[0]);
    });
  }, []);

  return (
    <>
      <Text
        marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '30px' }}
      >
        {<FormattedMessage {...messages.PendingDocuments} />}
      </Text>

      <Box
        borderRadius="sm"
        textAlign="center"
        bg="white"
        margin="auto"
        padding={{ xl: '51px 30px 27px 30px', base: '23px 30px 27px 30px' }}
        w={{ xl: '480px', base: '94%' }}
      >
        <Text fontSize={{ xl: '16px' }} textAlign="center">
          {<FormattedMessage {...messages.SendDocuments} />}
        </Text>
        {personalProfileStatus !== 2 && documentStatus !== 2 && landLineStatus !== 2 ? (
          <Box>
            <Flex
              marginTop={{ xl: '30px', base: '21px' }}
              paddingRight={{ xl: '31px', base: '16px' }}
              height={{ xl: '103px', base: '67px' }}
              border="1px solid #eceff1"
              textAlign="right"
            >
              <Flex alignItems="center" w="100%">
                <DocumentIcon width="32" height="38" />
                <Box width="100%" display="inline-block" verticalAlign="middle">
                  <Text fontSize={{ xl: '18px', base: '12px' }} marginRight="15px">
                    {<FormattedMessage {...messages.PersonalProfile} />}
                  </Text>
                  <Text
                    fontSize={{ xl: '14px', base: '9px' }}
                    marginRight="15px"
                    color={userStatus === 0 || userStatus === 4 ? '#708599' : 'red'}
                  >
                    {userStatus === 0 || userStatus === 4 ? (
                      <FormattedMessage {...messages.PendingDocuments} />
                    ) : (
                      <FormattedMessage {...messages.DocumentsNotAccepted} />
                    )}
                  </Text>
                </Box>
              </Flex>
              {userStatus === 0 || userStatus === 4 ? (
                ''
              ) : (
                <Text>{<FormattedMessage {...messages.AcceptStatusDocuments} />}</Text>
              )}

              {userStatus === 0 || userStatus === 4 ? '' : ''}

              <Box>
                {userStatus === 0 || userStatus === 4 ? (
                  ''
                ) : (
                  <Button
                    margin="10px 0 0 0 "
                    background="#1652F0"
                    color="#fff"
                    borderRadius="4px"
                    padding="20px 0"
                    width="100%"
                    text={<FormattedMessage {...messages.Edit} />}
                    onClick={() => {
                      if (onNextStep) onNextStep(currentStep - 1);
                    }}
                  />
                )}
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              marginTop="12px"
              paddingRight={{ xl: '31px', base: '16px' }}
              height={{ xl: '103px', base: '67px' }}
              border="1px solid #eceff1"
              textAlign="right"
            >
              <SelfieIcon />
              <Box display="inline-block" verticalAlign="middle">
                <Text fontSize={{ xl: '18px', base: '12px' }} marginRight="15px">
                  {<FormattedMessage {...messages.sendingDocuments} />}
                </Text>
                <Text
                  marginRight="15px"
                  fontSize={{ xl: '14px', base: '9px' }}
                  color={userStatus === 0 || userStatus === 4 ? '#708599' : 'red'}
                >
                  {userStatus === 0 || userStatus === 4 ? (
                    <FormattedMessage {...messages.PendingDocuments} />
                  ) : (
                    <FormattedMessage {...messages.DocumentsNotAccepted} />
                  )}
                </Text>
              </Box>

              {userStatus === 0 || userStatus === 4 ? (
                ''
              ) : (
                <P text={<FormattedMessage {...messages.AcceptStatusDocuments} />} />
              )}

              {userStatus === 0 || userStatus === 4 ? (
                ''
              ) : (
                <Button
                  margin="10px 0 0 0 "
                  background="#1652F0"
                  color="#fff"
                  borderRadius="4px"
                  padding="20px 0"
                  width="100%"
                  text={<FormattedMessage {...messages.Edit} />}
                  onClick={() => {
                    if (onNextStep) onNextStep(currentStep - 1);
                  }}
                />
              )}
            </Flex>
            <Flex
              marginTop="12px"
              alignItems="center"
              paddingRight={{ xl: '31px', base: '16px' }}
              height={{ xl: '103px', base: '67px' }}
              border="1px solid #eceff1"
              textAlign="right"
            >
              <TelephoneTwoIcon />
              <Box display="inline-block" verticalAlign="middle">
                <Text fontSize={{ xl: '18px', base: '12px' }} marginRight="15px">
                  {landLinePhone}
                </Text>
                {userStatus === 0 || userStatus === 4 ? (
                  <Text fontSize={{ xl: '14px', base: '9px' }} color="#708599" marginRight="15px">
                    زمان انتخابی شما:{dateTimeSelected}{userClockSelected}
                  </Text>
                ) : (
                  <Text>{<FormattedMessage {...messages.reSelectLandLinePhone} />}</Text>
                )}
              </Box>

              {userStatus === 0 || userStatus === 4 ? (
                ''
              ) : (
                <Button
                  margin="10px 0 0 0 "
                  background="#1652F0"
                  color="#fff"
                  borderRadius="4px"
                  padding="20px 0"
                  width="100%"
                  text={<FormattedMessage {...messages.Edit} />}
                  onClick={() => {
                    if (onNextStep) onNextStep(currentStep - 3);
                  }}
                />
              )}
            </Flex>
          </Box>
        ) : (
          <Box marginTop="30px">
            <Box display={personalProfileStatus === 2 ? 'block' : 'none'} border="1px solid #eceff1">
              <Flex alignItems="center" padding="44px 25px 31px 25px">
                <DocumentIcon height="38" width="32" />
                <Box textAlign="right" width="100%" display="inline-block" verticalAlign="middle">
                  <Text color="#050f19" fontSize={{ xl: '16px', base: '12px' }} marginRight="20px">
                    {<FormattedMessage {...messages.PersonalProfile} />}
                  </Text>
                  <Text color="#f4c622" fontSize={{ xl: '12px', base: '9px' }} marginRight="15px">
                    مشخصات ارسالی قابل قبول نیست
                  </Text>
                </Box>
              </Flex>
              <Box padding="45px 16px 17px 16px">
                <Text textAlign="right" fontSize="16px" color="#708599">
                  تصویر بارگذاری شده باید به صورت سلفی ( تصویر شخص شما ) به همراه متن دست نوشته و کارت شناسایی شما باشد.
                </Text>
                <Button
                  onClick={onOpen}
                  marginTop="17px"
                  height="60px"
                  background="#1652f0"
                  color="#fff"
                  fontSize="20px"
                  width="100%"
                >
                  اصلاح
                </Button>
              </Box>
            </Box>

            <Box display={documentStatus === 2 ? 'block' : 'none'} border="1px solid #eceff1" marginTop="12px">
              <Flex alignItems="center" padding="44px 25px 31px 25px">
                <SelfieIcon />
                <Box textAlign="right" width="100%" display="inline-block" verticalAlign="middle">
                  <Text color="#050f19" fontSize={{ xl: '16px', base: '12px' }} marginRight="20px">
                    {<FormattedMessage {...messages.sendingDocuments} />}
                  </Text>
                  <Text color="#f4c622" fontSize={{ xl: '12px', base: '9px' }} marginRight="15px">
                    <FormattedMessage {...messages.DocumentsNotAccepted} />
                  </Text>
                </Box>
              </Flex>
              <Box padding="45px 16px 17px 16px">
                <Text textAlign="right" fontSize="16px" color="#708599">
                  تصویر بارگذاری شده باید به صورت سلفی ( تصویر شخص شما ) به همراه متن دست نوشته و کارت شناسایی شما باشد.
                </Text>
                <Link
                  to={{
                    pathname: '/kyc/authorization/4',
                    state: { upload: true },
                  }}
                >
                  <Button marginTop="17px" height="60px" background="#1652f0" color="#fff" fontSize="20px" width="100%">
                    اصلاح
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box display={landLineStatus === 2 ? 'block' : 'none'} border="1px solid #eceff1" marginTop="12px">
              <Flex alignItems="center" padding="44px 25px 31px 25px">
                <TelephoneTwoIcon />
                <Box textAlign="right" width="100%" display="inline-block" verticalAlign="middle">
                  <Text color="#050f19" fontSize={{ xl: '16px', base: '12px' }} marginRight="20px">
                    {<FormattedMessage {...messages.Landline} />}
                  </Text>
                  <Text color="#f4c622" fontSize={{ xl: '12px', base: '9px' }} marginRight="15px">
                    {<FormattedMessage {...messages.reSelectLandLinePhone} />}
                  </Text>
                </Box>
              </Flex>
              <Box padding="45px 16px 17px 16px">
                <Text textAlign="right" fontSize="16px" color="#708599">
                  برای احراز هویت باید با تلفن ثابت شما تماس گرفته شود.در زمان انتخابی با شما تماس گرفته شد پاسخگو
                  نبودید.
                </Text>

                <Button
                  onClick={() => {
                    onNextStep(currentStep - 4);
                  }}
                  marginTop="17px"
                  height="60px"
                  background="#1652f0"
                  color="#fff"
                  fontSize="20px"
                  width="100%"
                >
                  اصلاح
                </Button>
              </Box>
            </Box>
          </Box>
        )}
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
    </>
  );
};

export default StepThirteen;
