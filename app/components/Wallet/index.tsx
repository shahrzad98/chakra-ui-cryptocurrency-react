import React from 'react';
import styled from 'styled-components';
import { Box, Text, Textarea, Tooltip } from '@chakra-ui/react';
import Typography from 'components/Typography';

import CustomPopover from 'components/Popover';
import CopyIcon from 'images/copy.svg';
import QrIcon from 'images/Icon-qrcode.svg';

type PropTypes = {
  address: string;
  tag?: string;
  cryptoName: string;
  qr: JSX.Element;
  icon: JSX.Element;
  network: string;
};

const Wrapper = styled.div`
  display: grid;
  background: #f5f7f7;
  align-items: center;
  direction: ltr !important;
  padding: 0 18px;
  grid-column-gap: 16px;
  grid-template-columns: 1fr repeat(2, 16px);
`;

const _handleCopy = ({ current }) => {
  current.select();
  current.setSelectionRange(0, 99999); /* For mobile devices */
  document.execCommand('copy');
};

const Wallet: React.FC<PropTypes> = ({ address, tag, cryptoName, icon, network, qr }) => {
  const [value] = React.useState(address);
  const [tagValue] = React.useState(tag);
  const tagRef = React.useRef(null);
  const addressRef = React.useRef(null);

  return (
    <Box display="grid" gridRowGap="22px" padding="10px 0">
      <Typography variant="caption">
        <strong>میانگین مدت زمان لازم برای نشستن (۱ دقیقه)</strong>
      </Typography>
      <Box display="grid" gridRowGap="5px">
        <Text fontSize="13px" color="#7e8b9a">
          آدرس
        </Text>
        <Wrapper>
          <Textarea
            _focus={{
              border: 0,
              boxShadow: 'none',
            }}
            ref={addressRef}
            fontSize="16px"
            resize="unset"
            overflow="hidden"
            border="0px"
            margin="18px 10px 18px 0"
            padding="0"
            background="transparent"
            outline="0"
            minHeight="46px"
            fontFamily="graphik"
            readOnly
            value={value}
          />
          <Tooltip hasArrow label="Copy" bg="gray.300" fontFamily="graphik" color="black" placement="top">
            <Box onClick={e => _handleCopy(addressRef)} cursor="pointer" width="100%">
              <CopyIcon />
            </Box>
          </Tooltip>
          <CustomPopover
            placement="top"
            title={`آدرس ${cryptoName} روی ${network}`}
            trigger={
              <Box cursor="pointer" width="100%">
                <QrIcon />
              </Box>
            }
          >
            <Box width="146px" margin="auto">
              {qr}
            </Box>
          </CustomPopover>
        </Wrapper>
      </Box>
      <Box display="grid" gridRowGap="5px">
        <Text fontSize="13px" color="#7e8b9a">
          کدتگ
        </Text>
        <Wrapper>
          <Textarea
            _focus={{
              border: 0,
              boxShadow: 'none',
            }}
            ref={tagRef}
            fontSize="16px"
            resize="unset"
            overflow="hidden"
            border="0px"
            padding="16px 0"
            background="transparent"
            outline="0"
            minHeight="54px"
            fontFamily="graphik"
            readOnly
            value={tagValue}
          />
          <Tooltip hasArrow label="Copy" bg="gray.300" fontFamily="graphik" color="black" placement="top">
            <Box cursor="pointer" width="100%" onClick={e => _handleCopy(tagRef)}>
              <CopyIcon />
            </Box>
          </Tooltip>
          <CustomPopover
            placement="top"
            title={`کدتگ ${cryptoName} روی ${network}`}
            trigger={
              <Box cursor="pointer" width="100%">
                <QrIcon />
              </Box>
            }
          >
            <Box width="146px" margin="auto">
              {qr}
            </Box>
          </CustomPopover>
        </Wrapper>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 36px">
        <Box display="grid" gridRowGap="5px">
          <Typography variant="caption" color="dark">
            {`ارز ${cryptoName} خود را به این آدرس ارسال کنید`}
          </Typography>
          <Typography variant="caption">
            در نظر داشته باشید که ارسال هر ارز دیگری به این آدرس، باعث از بین رفتن دارایی شما خواهد شد
          </Typography>
          <Typography variant="caption">
            دقت کنید که ارز مورد نظر را روی شبکه انتخابی آن انتقال دهید. در غیر این صورت دارایی شما از بین خواهد رفت
          </Typography>
        </Box>
        <Box alignSelf="end" width="100%">
          {icon}
        </Box>
      </Box>
    </Box>
  );
};

export default Wallet;
