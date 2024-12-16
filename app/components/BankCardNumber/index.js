/**
 *
 * BankCardNumber
 *
 */

import Input from '../Input';
import React, { useEffect, useState } from 'react';
import Button from '../RabexButton';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/Auth/UserAuthorize/messages';
import { Box } from '@chakra-ui/layout';
import { PlusTwo } from 'images/icon';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';

function BankCardNumber({ onLoad, changeCard, status }) {
  const [cardSection1, setCardSection1] = useState('');
  const [cardSection2, setCardSection2] = useState('');
  const [cardSection3, setCardSection3] = useState('');
  const [cardSection4, setCardSection4] = useState('');

  const [isLoader, setIsLoader] = useState(true);

  const [form, setForm] = useState({
    cardsection1: '',
    cardsection2: '',
    cardsection3: '',
    cardsection4: '',
  });
  useEffect(() => {
    setIsLoader(status);
    if (status) {
      setCardSection1('');
      setCardSection2('');
      setCardSection3('');
      setCardSection4('');
      document.getElementById('cardSection1').value = '';
      document.getElementById('cardSection2').value = '';
      document.getElementById('cardSection3').value = '';
      document.getElementById('cardSection4').value = '';
    }
    if (changeCard != '') {
      setCardSection1(changeCard?.substring(0, 4));
      setCardSection2(changeCard?.substring(4, 8));
      setCardSection3(changeCard?.substring(8, 12));
      setCardSection4(changeCard?.substring(12, 16));
      setForm({
        cardsection1: changeCard?.substring(0, 4),
        cardsection2: changeCard?.substring(4, 8),
        cardsection3: changeCard?.substring(8, 12),
        cardsection4: changeCard?.substring(12, 16),
      });
    }
  }, [changeCard, status]);

  const setCard = (e, section) => {
    switch (section) {
      case 'cardSection1':
        setCardSection1(e);
        if (e.length == 4) document.getElementById('cardSection2').focus();
        break;
      case 'cardSection2':
        setCardSection2(e);
        if (e.length == 4) document.getElementById('cardSection3').focus();
        if (e.length == 0) document.getElementById('cardSection1').focus();
        break;
      case 'cardSection3':
        setCardSection3(e);
        if (e.length == 4) document.getElementById('cardSection4').focus();
        if (e.length == 0) document.getElementById('cardSection2').focus();
        break;
      case 'cardSection4':
        setCardSection4(e);
        if (e.length == 0) document.getElementById('cardSection3').focus();
        break;
    }
  };
  const handleTextChange = (e, section) => {
    if (e.length > 4) {
      e = e.slice(0, 4);
      setCard(e, section);
    }
    setCard(e, section);
  };
console.log(isLoader);
  return (
    <>
      <Box w={{ base: '50px' }}  display="inline-block" textAlign="center">
        <Button
          display="inline-block"
          background="#1652F0"
          fontSize={{ xl: '13px', base: '10px' }}
          borderRadius="4px"
          alignItems="flex-start"
          padding="6px 7px 6px 7px"
          color="#fff"
          height={{base:"30px !important",xl:"37px !important"}}
          text={<FormattedMessage {...messages.Add} />}
          onClick={e => {
            onLoad(form.cardsection1 + form.cardsection2 + form.cardsection3 + form.cardsection4);
          }}
          img={!isLoader ? <ScaleLoader height={10} width={1} color={'#fff'} /> :<PlusTwo /> }
          widthImg="5px"
          heightImg="5px"
          PaddingImg={{ xl: '0 0 0 6px', base: '0 0 0 4px' }}
        />
      </Box>
      <Box w={{xl:"421px"}} dir="ltr" textAlign="left" display="inline-block">
        <Input
          direction="ltr"
          width={{ base: '44px', xl: '63px' }}
          border="1px solid #1652F0"
          type="number"
          padding="6px 0"
          height={{base:"30px !important",xl:"100% !important"}}
          id="cardSection1"
          fontSize={{ base: '12px', xl: '16px' }}
          textAlign="center"
          value={cardSection1}
          borderRadius="4px"
          onInputChange={event => {
            setForm({ ...form, cardsection1: event.target.value });
            // validateCard();
            handleTextChange(event.target.value, 'cardSection1');
          }}
        />
        <Box margin="0 6px" display="inline-block" color="#CBD5E0">
           - 
        </Box>
        <Input
          direction="ltr"
          width={{ base: '44px', xl: '63px' }}
          border="1px solid #1652F0"
          type="number"
          height={{base:"30px !important",xl:"100% !important"}}
          fontSize={{ base: '12px', xl: '16px' }}
          id="cardSection2"
          padding="6px 0"
          value={cardSection2}
          borderRadius="4px"
          textAlign="center"
          onInputChange={event => {
            setForm({ ...form, cardsection2: event.target.value });
            // validateCard();
            handleTextChange(event.target.value, 'cardSection2');
          }}
        />
        <Box margin="0 6px" display="inline-block" color="#CBD5E0">
          -
        </Box>
        <Input
          direction="ltr"
          width={{ base: '44px', xl: '63px' }}
          border="1px solid #1652F0"
          type="number"
          height={{base:"30px !important",xl:"100% !important"}}
          fontSize={{ base: '12px', xl: '16px' }}
          padding="6px 0"
          id="cardSection3"
          textAlign="center"
          value={cardSection3}
          borderRadius="4px"
          onInputChange={event => {
            setForm({ ...form, cardsection3: event.target.value });
            // validateCard();
            handleTextChange(event.target.value, 'cardSection3');
          }}
        />
        <Box margin="0 6px" display="inline-block" color="#CBD5E0">
          -
        </Box>
        <Input
          direction="rtl"
          width={{ base: '44px', xl: '63px' }}
          border="1px solid #1652F0"
          type="number"
          height={{base:"30px !important",xl:"100% !important"}}
          fontSize={{ base: '12px', xl: '16px' }}
          padding="6px 0"
          id="cardSection4"
          textAlign="center"
          value={cardSection4}
          borderRadius="4px"
          onInputChange={event => {
            setForm({ ...form, cardsection4: event.target.value });
            // validateCard();
            handleTextChange(event.target.value, 'cardSection4');
          }}
        />
      </Box>
    </>
  );
}

export default BankCardNumber;
