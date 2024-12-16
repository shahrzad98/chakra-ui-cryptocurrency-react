import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { Flex, Spacer, Text, Box, Divider } from '@chakra-ui/react';
import { Paper, TicketIcon, CopyBlue, ArrowBack } from '../../images/icon';
import { useHistory } from 'react-router';
interface Props {
  ticket_id: string;
  ticket_title: string;
}
import { ToastContainer, toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TicketHeader(props: Props) {
  const history = useHistory();

  function Copy(id) {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document?.getElementById('p_' + id)?.setAttribute('type', 'text');
      /* Get the text field */
      var copyText = document.getElementById('p_' + id) as HTMLInputElement;

      /* Select the text field */
      copyText?.select();
      copyText?.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator?.clipboard?.writeText(copyText?.value);
      document.getElementById('p_' + id)?.setAttribute('type', 'hidden');
      toast.success('شماره تیکت کپی شد', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      var emailLink = document.getElementById(id);
      var range = document.createRange();
      if (emailLink) {
        range.selectNode(emailLink);
        window?.getSelection()?.addRange(range);

        try {
          // Now that we've selected the anchor text, execute the copy command
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copy email command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
        window?.getSelection()?.removeAllRanges();

        toast.success('شماره تیکت کپی شد', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

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

      <Flex
        onClick={e => {
          history.push(`/dashboard/ticket`);
        }}
        display={{ base: 'flex', lg: 'none' }}
        background="#fff"
        height="44px"
        alignItems="center"
        cursor="pointer"
        marginBottom="10px"
      >
        <Box marginRight="12px">
          <TicketIcon />
        </Box>
        <Text color="#233a7d" paddingRight="8px">
          تیکت
        </Text>
        <Spacer />
        <Flex paddingLeft="12px" alignItems="center">
          <ArrowBack />
        </Flex>
      </Flex>

      <Flex background="#fff" alignItems="center" padding="0 20px" lineHeight="60px">
        <Text color="#233a7d" fontSize={{ base: '12px', xl: '14px' }} display="inline-block" fontFamily="yekan">
          تیکت
        </Text>
        <Flex
          alignItems="center"
          onClick={e => {
            Copy(props?.ticket_id);
          }}
          cursor="pointer"
        >
          <Text id={props?.ticket_id} fontSize={{ base: '12px', xl: '14px' }} color="#233a7d" marginRight="6px">
            {props.ticket_id}
          </Text>
          <input value={props?.ticket_id} type="hidden" id={'p_' + props?.ticket_id} />
          <Box marginRight="4px">
            <CopyBlue />
          </Box>
        </Flex>

        <Divider height="20px !important" marginRight="8px" width="1px" orientation="vertical" />
        <Text color="#233a7d" fontSize={{ base: '12px', xl: '14px' }} fontFamily="yekan" marginRight="8px">
          {props.ticket_title}
        </Text>
        <Spacer />
        <Flex
          padding="0 14px"
          height="34px"
          alignItems="center"
          background="#f3f5f8"
          borderRadius="20px"
          color="#233a7d"
        >
          <Paper />
          <Text
            cursor="pointer"
            onClick={e => {
              history.push(`/dashboard/ticket`);
            }}
            fontSize={{ base: '10px', xl: '12px' }}
            marginRight="8px"
          >
            تاریخچه پشتیبانی
          </Text>
        </Flex>
      </Flex>
      <Box borderBottom="1px solid #f4f6fa" />
    </>
  );
}

export default TicketHeader;
