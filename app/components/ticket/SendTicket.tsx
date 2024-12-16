import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Flex, Spacer, Button, Box, Text } from '@chakra-ui/react';
import UploadTicket from './UploadTicket';

interface Props {
  onLoad: any;
  images: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SendTicket(props: Props) {
  const [imageList, setImageList] = useState<{ file: File }[]>([]);

  const setImageToState = file => {
    setImageList(prev => [...prev, { file: file }]);
  };

  return (
    <>
      <Box marginTop="16px">
        <Text color="#233a7d" fontSize="12px">
          حداکثر حجم فایل ۵ مگابایت میباشد
        </Text>
      </Box>
      <Box display={{ lg: 'flex', base: 'block' }} marginTop="10px" width="100%">
        <Flex alignItems="center" dir="ltr" marginLeft="27px" border="2px dashed  #708599 !important" w={['100%']}>
          <Box cursor="pointer" padding={{ base: '10px 0', xl: '0' }} className="btn-file">
            <Button
              color="#fff"
              borderRadius="3px"
              fontSize={{ base: '10px', xl: '12px' }}
              background="#1650e9"
              width="82px"
              height="36px"
              padding="0 16px 0 16px"
              margin="0 8px"
              cursor="pointer"
            >
              انتخاب تصویر
            </Button>
            <input
              onChange={(e: any) => {
                if (e?.target?.files[0]?.name !== undefined && e?.target?.files[0]?.name !== '') {
                  setImageToState(e?.target?.files[0]);
                }
              }}
              type="file"
            />
          </Box>
          {imageList.map((value, index) => (
            <UploadTicket
              image={value}
              key={index}
              file={file => {
                props.images(file);
              }}
            />
          ))}
        </Flex>

        <Spacer />
        <Button
          color="#fff"
          borderRadius="3px"
          background="#1650e9"
          _hover={{ background: '#1650e9' }}
          _active={{ background: '#1650e9' }}
          onClick={e => {
            props.onLoad(e);
          }}
          width={{ base: '100%', xl: '184px' }}
          marginTop={{ base: '20px', xl: '0' }}
          height="55px"
          fontSize={{ base: '14px', xl: '16px' }}
        >
          ارسال تیکت
        </Button>
      </Box>
    </>
  );
}

export default SendTicket;
