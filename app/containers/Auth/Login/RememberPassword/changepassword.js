/**
 *
 * changepassword
 *
 */

import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { GetURL } from 'utils/urlMap';
import RabexButton from 'components/RabexButton';
import RememberBody from './rememberbody';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import LocaleToggle from 'containers/LocaleToggle';
import CounterButton from 'components/CounterButton';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import { api } from 'utils/network';
import { LanguageTools } from '../../../../utils/languageTools';
import P from 'components/P';
import Label from 'components/Label';
import RInput from 'components/Input';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { Button } from '@chakra-ui/react';

const ChangePassword = () => {
  const { state } = useLocation();

  const [newPassword,setNewPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

  const ChangePassword = () =>{
    
    api
      .put(GetURL('change-password'), {
        tasks: state.tasks.tasks,
        totp:state.totp,
        password:newPassword,
        password_confirm:confirmPassword
      })
      .then(response => {
   
      })
      .catch(error => console.error(error));
  }

  return (
    <Container
      fluid
      className="m-auto"
      onKeyDown={e => {
        if (e.charCode == 13 || e.keyCode == 13) {
        }
      }}
    >
      <Row className="m-auto">
        <Col lg="4" className="m-auto">
          <RememberBody>
            <P
              textAlign="right"
              margin="25px auto 35px auto"
              fontSize="2.4rem"
              text={<FormattedMessage {...messages.changepassword} />}
            />
       

            <Label
              margin="15px 0 10px 0"
              color="#767676"
              textAlign="right"
              width="100%"
              text={<FormattedMessage {...messages.choosenewpassword} />}
            />

            <RInput
              typename="text"
              name="cellphone"
              id="cellphone"
              border="1px"
              direction="ltr"
              className="form-control"
              onInputChange={event =>
                setNewPassword(event.target.value)
              }
            />

            <Label
              margin="15px 0 10px 0"
              color="#767676"
              textAlign="right"
              width="100%"
              text={<FormattedMessage {...messages.Repeat_password} />}
            />

            <RInput
              typename="text"
              name="cellphone"
              id="cellphone"
              direction="ltr"
              border="1px"
              className="form-control"
              onInputChange={event =>
                setConfirmPassword(event.target.value)
              }
            />

            <div className="m auto text-center">
              <Button
                background="rgb(22, 82, 240)"
                color="#fff"
                margin="15px auto"
                borderRadius="4px;"
                padding="15px 45px"
                fontSize="18px"
                onClick={(e)=>{
                  ChangePassword()
                }}
                text={<FormattedMessage {...messages.changepassword} />}
              />
            </div>
          </RememberBody>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
