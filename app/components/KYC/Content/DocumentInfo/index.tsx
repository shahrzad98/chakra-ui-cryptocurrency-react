import {Box, Divider, Flex, Text} from '@chakra-ui/react';
import {useWindowSize} from 'helper/useWindowSize';
import * as React from 'react';
import {FC} from 'react';
import {FormattedMessage} from 'react-intl';
import messages from '../../messages'
import StatusBadge from '../Warning/StatusBadge';
import SelfieBox from './SelfieBox';
import UploadDocument from './UploadDocument';

type DocumentInfoProps = {
  userStatusInfo: any
};
const DocumentInfo: FC<DocumentInfoProps> = ({userStatusInfo}) => {
  const {width} = useWindowSize();

  return (
    <Box w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}} className="kyc_section documentInfo">
      <Box display={width > 768 ? 'flex' : 'block'} justifyContent="space-between">
        <Flex>
          <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
                className="title" marginLeft="5px">
            2.
          </Text>
          <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
                className="title">
            <FormattedMessage {...messages.documentInfo} />
          </Text>
        </Flex>

        {[0,2 ,4].includes(userStatusInfo?.documents_batch?.status) &&  [4, 2].includes(userStatusInfo?.status) &&
        <StatusBadge
          rejectedMessage={<FormattedMessage {...messages.invalidEntry} values={{keyword: 'مدرک ارسالی'}}/>}
          status={userStatusInfo?.documents_batch?.status}/>}


      </Box>
      <Divider background="#dedfe2" orientation="horizontal"/>
      {userStatusInfo?.status === 2 && userStatusInfo?.base_info_batch?.reasons && <Box>
        <Text fontSize="16px" fontFamily="yekanb" color="#e91e63" margin="20px 0 3px ">
          <FormattedMessage {...messages.operatorComments} />
        </Text>
        <Text color="#59636e">
          {userStatusInfo?.documents_batch?.reasons?.map(el => el.reason).join(' ')}
        </Text>
      </Box>}
      <SelfieBox/>
      <UploadDocument status={userStatusInfo?.status}
                      imagePreview={userStatusInfo?.status > 0 && userStatusInfo?.documents_batch_data?.selfie_file}/>
    </Box>
  );
};

export default DocumentInfo;
