import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Box, Text } from '@chakra-ui/react';
import ProgressBar from 'components/ProgressBar';
import { GetURL } from '../../utils/urlMap';
import handleUpload from '../UploadFile/handler';
interface Props {
  image: any;
  file: any;
}
import { ToastContainer, toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function UploadTicket(props: Props) {
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = React.useState<boolean>(false);

  function smartTrim(str, length, delim, appendix) {
    if (str.length <= length) return str;
    var trimmedStr = str.substr(0, length + delim.length);
    var lastDelimIndex = trimmedStr.lastIndexOf(delim);
    if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);
    if (trimmedStr) trimmedStr += appendix;
    return trimmedStr;
  }
  const handleOnSubmit = (blob): void => {
    setProgress(0);
    setHasError(false);
    handleUpload({
      blob,
      url: GetURL('ticket-upload'),
      onProgress: val => setProgress(val > 0 ? val - 1 : 0),
    })
      .then((val: string) => {
        setProgress(100);
        props.file(val);
        setHasError(false);
      })
      .catch(error => {
        setHasError(true);
        setProgress(-1);
        toast.error('حجم فایل وارد شده بیشتر از ۵ مگابایت است', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    handleOnSubmit(props.image.file);
  }, []);

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
      <Box width="120px" display="block">
        <Box textAlign="center" borderRadius="3px" background="rgba(219, 227, 241,0.3)" margin="0 4px">
          <Text>
            {smartTrim(props.image.file.name, 5, '', '...')}
            {props.image.file.name.substr(props.image.file.name.length - 5)}
          </Text>
        </Box>

        <ProgressBar value={progress} hasError={hasError} />
      </Box>
    </>
  );
}

export default UploadTicket;
