import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { MDBInput } from 'mdbreact';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ReactCodeInput from 'react-verification-code-input';
import { NavLink } from 'react-router-dom';
import FlashMessage from '../../../../components/FlashMessage';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import SuccessMessage from '../../../../components/Verifier/SuccessMessage';
import ResetPasswordForm from '../../../../components/ResetPassword';

const ForgetPassword = () => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [showSecretCodeInput, setShowSecretCodeInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const SendCode = () => {
    api
      .post(GetURL('request-totp'), { username: username })
      .then(request => {
        if (request.data) {
          setErrorMessage(request.data.data);
        }
      })
      .catch(error => {
        if (error.data.error) {
          setErrorMessage(error.data.error);
        }
      });
  };
  const verifyCode = verificationCode => {
    api
      .post(GetURL('verify-code'), {
        username: username,
        secret: verificationCode,
      })
      .then(response => {
        if (response.data.error) {
          setShowSuccessMessage(true);
          setErrorMessage(response.data.data);
          setShowNewPassword(true);
          if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem(
              'refresh_token',
              response.data.data.refresh_token,
            );
          }
        }
      })
      .catch(error => {
        if (error.data.error) {
          setErrorMessage(error.data.error);
        }
      });
  };

  return (
    <Container className="mt-2">
      <SuccessMessage
        isOpen={showSuccessMessage}
        toggle={e => setShowSuccessMessage(!showSuccessMessage)}
      />
      <Row>
        {!showNewPassword ? (
          <Col className="m-auto" lg={6} md={10}>
            <FormattedMessage {...messages.mobileno}>
              {msg => (
                <MDBInput
                  label={msg}
                  onChange={e => setUsername(e.target.value)}
                />
              )}
            </FormattedMessage>
            <br />
            <i>
              <small>
                <FormattedMessage {...messages.recoverMethod} />
              </small>
            </i>
            <br />
            <br />
            <Col className="w-100 m-auto text-center">
              <NavLink
                to=""
                onClick={e => {
                  e.preventDefault();
                  SendCode();
                  setShowSecretCodeInput(true);
                }}
              >
                <FormattedMessage {...messages.totpMethod} />
              </NavLink>{' '}
              |{' '}
              <i
                style={{ color: '#D5D8DC' }}
                to=""
                onClick={e => {
                  e.preventDefault();
                }}
                isActive={false}
              >
                <FormattedMessage {...messages.securityQuestionMethod} />
              </i>
            </Col>
            <Container className="mt-4" dir="ltr">
              {showSecretCodeInput ? (
                <ReactCodeInput
                  className="m-auto"
                  onChange={e => {
                    setSecret(e);
                    if (e.length == 6) {
                      verifyCode(e);
                    }
                  }}
                  value={secret}
                />
              ) : null}
              <Container className="mt-2">
                <FlashMessage errorMessage={errorMessage} />
              </Container>
            </Container>
          </Col>
        ) : null}
        {showNewPassword ? <ResetPasswordForm /> : ''}
      </Row>
    </Container>
  );
};

export default ForgetPassword;
