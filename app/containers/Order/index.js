/**
 *
 * UserProfile
 *
 */

import React from 'react';
import { Container } from 'reactstrap';
import AuthBox from '../../components/AuthBox';
import { FormattedMessage } from 'react-intl';
import { LanguageTools } from '../../utils/languageTools';
import TitleBar from '../../components/TitleBar';
import P from '../../components/P';

const Order = ({ dir }) => {
  const language = new LanguageTools();
  const exchange = location.pathname.split('/');

  return (
    <>
      <Container dir={language.Dir} className={language.Align}>
        <AuthBox>
          <TitleBar
            text="ثبت سفارش"
            color="#fff"
            height="70px"
            icon={require('images/icons_wallet.svg')}
            background="rgb(22, 82, 240)"
          />
          <P
            text={
              ' شما مقدار ' +
              exchange[3] +
              ' را از ارز ' +
              exchange[4] +
              ' به ارز ' +
              exchange[5] +
              'تبدیل کردید' +
              'و به کیف پول ' +
              exchange[5] +
              ' شما اضافه شد'
            }
          />
        </AuthBox>
      </Container>
    </>
  );
};

export default Order;
