import {SmallCloseIcon, TimeIcon} from '@chakra-ui/icons';
import {Flex, Text} from '@chakra-ui/react';
import {batchStatusColorDictionary, statusErrorColorDictionary} from 'constants/kyc';
import {useWindowSize} from 'helper/useWindowSize';
import * as React from 'react';
import {FC} from 'react';

type StatusBadgeProps = {
  status: number,
  rejectedMessage?: any,
};
const StatusBadge: FC<StatusBadgeProps> = ({status, rejectedMessage = ""}) => {
  const {width} = useWindowSize();
  return (
    <Flex h="42px" w={{base: "287px%", lg: "226px"}} backgroundColor={statusErrorColorDictionary[status]}
          borderRadius={width > 768 ? "0 12px 12px 0" : "12px"} justifyContent="center" position="relative"
          left={width > 768 ? "-35px" : "0"} top={width < 768 ? "-10px" : "-8px"}
    >
      {status === 2 ? <SmallCloseIcon fontSize="20px" color="#e91e63" alignSelf="center"/> :
        [0,4].includes(status) ? <TimeIcon width="12px" color="#ffa200" alignSelf="center" marginLeft="3px"/> : null}
      <Text fontSize="16px" color={batchStatusColorDictionary[status]} fontFamily="yekanb">
        {[0,4].includes(status) ?
          "در حال بررسی":
            status === 2 ? rejectedMessage : null
        }
      </Text>
    </Flex>
  );
};

export default StatusBadge;
