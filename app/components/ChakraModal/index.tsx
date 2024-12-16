/**
 *
 * ChakraModal
 *
 */
import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Img,
  Stack,
  Link,
  Input,
  Radio,
  RadioGroup,
  Button,
  Flex,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
// import styled from 'styles/styled-components';

interface Props {OpenStepOne:any,onCloseWithdrawCurrency:any,isOpenWithdrawCurrency:any}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ChakraModal(props: Props) {
  return (
    <>
    <Modal
        onClose={props.onCloseWithdrawCurrency}
        size="2xl"
        isOpen={props.isOpenWithdrawCurrency}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton left="15px" />
          <ModalBody padding="0" width="100%" dir="rtl">
            <Box>
              <Box padding="15px">
                <Text display="inline-block" fontSize="18px">
                  کد تگ
                </Text>
              </Box>
              <Box>
                <hr />
                <Box padding="15px">
                  <Img
                    margin="40px auto 20px auto"
                    src={require('images/info-modal.svg')}
                  />

                  <Text textAlign="center" fontSize="15px">
                    شما کد تگ وتارد نکردید !
                  </Text>
                  <Text marginTop="12px" textAlign="center" fontFamily="yekan">
                    اگر آدرس مقصد کد تگ داشته باشد و شما آن را وارد نکنید،
                    دارایی شما از بین خواهد رفت. آیا اطمینان دارید که آدرس مقصد
                    کد تگ ندارد؟
                  </Text>
                  <Box textAlign="center">
                    <Link>کد تگ چیست ؟</Link>
                  </Box>

                  <Flex
                    marginTop="20px"
                    justifyContent="center"
                    marginBottom="30px"
                  >
                    <Button background="#f5f7f7" marginLeft="10px">
                      اصلاح درخواست
                    </Button>
                    <Button
                      background="#1652f0"
                      color="#fff"
                      marginRight="10px"
                      onClick={e => {
                        props.OpenStepOne(
                          true
                      );
                      }}
                    >
                      تایید
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChakraModal;
