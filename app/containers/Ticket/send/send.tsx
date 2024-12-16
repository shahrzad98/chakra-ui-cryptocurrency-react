import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Select from 'components/MaterialSelect';
import 'react-tabs/style/react-tabs.css';
import SendTicket from 'components/ticket/SendTicket';
import HistoryTicketHeader from 'components/ticket/HistoryTicketHeader';
import { api } from '../../../utils/network';
import { GetURL } from '../../../utils/urlMap';
import { useHistory } from 'react-router';
import Editor from 'components/Editor';
import { ToastContainer, toast } from 'react-toastify';

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sendTicket(props: Props) {
  const [ticketCategory, setTicketCategory] = useState([]);
  const [ticketBody, setTicketBody] = useState('');
  const [categoryUUID, setCategoryUUID] = useState('');
  const [attachmentsAddresses, setAttachmentsAddresses] = useState<{ file: File }[]>([]);
  const history = useHistory();

  type messageValueType = {
    categoryUUID: string;
    categoryTitle: string;
  };

  useEffect(() => {
    api
      .post(GetURL('get-category-ticket'), {})
      .then((data: any) => {
        setTicketCategory(data.responses);
      })
      .catch(err => {});
  }, []);

  const validate = () => {
    if (ticketBody.length <= 21) {
      toast.error('توضیحات تیکت خالی است', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (categoryUUID === '') {
      toast.error('موضوع تیکت خالی است', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    api
      .post(GetURL('send-ticket'), {
        body: ticketBody,
        categoryUUID: categoryUUID,
        header: 'a',
        attachmentsAddresses: attachmentsAddresses,
      })
      .then(data => {
        toast('عملیات با موفقیت انجام شد', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push(`/dashboard/ticket/`);
      })
      .catch(err => {});
  };

  const onChange = (value: string): void => {
    console.log(ticketBody);
    setTicketBody(value);
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ToastContainer />
      <Box margin="0 auto" width={['100%', '100%', '100%', '100%', '80%', '1120px']}>
        <Box padding={{ sm: '16px', xl: '0' }} width={['100%', '100%', '100%', '100%', '100%', '1120px']}>
          <HistoryTicketHeader />
          <Box background="#fff" padding="19px 24px 32px 24px">
            <Box textAlign="right">
              <Text marginTop={{ base: '11px', xl: '18px' }} fontSize={{ base: '14px', xl: '16px' }} color="#233a7d">
                انتخاب موضوع
              </Text>
            </Box>
            <Box marginTop="10px">
              <Select
                bg="white"
                color="#050f19"
                fontSize={{ base: '12px', xl: '16px' }}
                height={{ base: '45px', xl: '55px' }}
                borderRadius="2px"
                fontFamily="yekan"
                onChange={e => setCategoryUUID(e.target.value)}
              >
                <option>انتخاب کنید</option>

                {ticketCategory.map((value: messageValueType) => (
                  <option value={value?.categoryUUID}>{value?.categoryTitle}</option>
                ))}
              </Select>
            </Box>
            <Box textAlign="right">
              <Text marginTop={{ base: '11px', xl: '24px' }} fontSize={{ base: '14px', xl: '16px' }} color="#233a7d">
                توضیحات :
              </Text>
            </Box>

            <Box fontFamily="yekan" marginTop="10px">
              <Editor onChange={onChange} />
            </Box>

            <Box>
              <SendTicket
                onLoad={e => {
                  validate();
                }}
                images={file => {
                  // file = 'tmp/' + file;
                  setAttachmentsAddresses([...attachmentsAddresses, file]);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default sendTicket;
