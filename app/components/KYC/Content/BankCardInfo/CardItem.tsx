import {Flex, Image, Box, Text} from '@chakra-ui/react';
import {batchStatusColorDictionary, batchStatusDictionary} from 'constants/kyc';
import {spliteWithDash} from 'helper/MiscHelper';
import {useWindowSize} from 'helper/useWindowSize';
import * as React from 'react';
import {FC} from 'react';

type CardItemProps = {
  verificationStatus: number,
  cardNumber: string,
  logo: string,
};
const CardItem: FC<CardItemProps> = ({verificationStatus, cardNumber, logo}) => {
  const {width} = useWindowSize();
  return (
    <Flex w={{base: '', lg: '415px'}} border="solid 1px #d6dade" padding="14px 15px" justifyContent="space-between"
          borderRadius="4px" marginBottom="8px">
      <Flex>
        {width > 768 && <Box width={width > 768 ? "30px" : "25px"}>
          <Image src={`http://${window.location.host}/api/v1/static/icons/${logo}`}/>
        </Box>}
        <Text margin={width > 768 ? "0 20px" : "0"} color={batchStatusColorDictionary[verificationStatus]}
              fontSize="12px"
              fontFamily="yekanb">
          {batchStatusDictionary[verificationStatus]}
        </Text>
      </Flex>
      <Text fontSize={width > 768 ? "20px" : "16px"} fontFamily="yekanb" color="#1652f0" dir="ltr">
        {spliteWithDash(cardNumber)}
      </Text>
    </Flex>
  );
};

export default CardItem;
