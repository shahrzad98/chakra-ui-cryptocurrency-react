import React, { useEffect, useState } from 'react';
import { Box,Img } from '@chakra-ui/react';
import Banner from '../../images/icon/banner-ticket.png';

const BannerTicket = () : JSX.Element => {
  return <Box borderRadius="6px" background="#fff" width={['280px']}>
    <Img src={Banner} />
  </Box>;
}

export default BannerTicket;
