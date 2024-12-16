import {Alert, Box, Flex, Text} from '@chakra-ui/react';
import {useWindowSize} from 'helper/useWindowSize';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import messages from '../../messages'
import Reject from 'images/kyc/reject.svg';
import Pending from 'images/kyc/pending.svg';
import {batchStatusBackgroundDictionary, batchStatusColorDictionary, digits} from 'constants/kyc';
import {FC} from 'react';

type WarningProps = {
  status: number;
  document: number;
  landline: number;
  baseInfo: number;
};
const Warning: FC<WarningProps> = ({status, baseInfo, document, landline}) => {
  const {width} = useWindowSize();
  const rejectedBatches = [
    document === 2 && 'مدارک ارسالی',
    landline === 2 && 'تلفن ثابت',
    baseInfo === 2 && 'مشخصات فردی',
  ]
  return (
    <Alert backgroundColor={batchStatusBackgroundDictionary[status]} margin="0 auto"
           w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}}
           h={{base: "179px", lg: "116px"}}
           padding={width > 768 ? "25px" : "15px"} marginBottom="15px" display="inherit">
      <Flex>
        <Box margin="auto 15px" position="absolute" top="30px" with={width > 768 ? "35px" : "33px"}>
          {status === 4 ?
            <Pending/> : <Reject/>}
        </Box>
        <Text fontFamily="yekanb" fontSize="18" color={status === 4 ? "#55401c" : batchStatusColorDictionary[status]}
              marginBottom="5px"
              marginRight="65px"
              position="relative" top={width < 768 ? "20px" : "0"}>
          {status === 4 && <FormattedMessage {...messages.pendingStatusWarning} />}
          {status === 2 && <FormattedMessage {...messages.rejectStatusWarning} />}
        </Text>
      </Flex>

      <Text className="kyc__Content--warningStatus"
            color={status === 4 ? "#55401c" : batchStatusColorDictionary[status]}>
        {status === 4 && <FormattedMessage {...messages.pendingStatusWarning1} />}
        {status === 2 &&

        <p>
         <span>
        {rejectedBatches.filter(Boolean).join(' و ')}
        </span>

          &nbsp;           شما مورد تایید نیست. لطفا با توجه به توضیحات کارشناس این
          &nbsp;{digits[rejectedBatches?.filter(Boolean)?.length]} &nbsp;
          قسمت را اصلاح کنید و دکمه تایید و ارسال به کارشناس
          را بزنید.

        </p>
        }
      </Text>
    </Alert>
  );
};

export default Warning;
