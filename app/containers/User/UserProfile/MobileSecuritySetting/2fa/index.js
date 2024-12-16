import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import messages from "../../../messages";;
import P from "../../../../../components/P";
import { api } from "../../../../../utils/network";
import { GetStatic, GetURL } from "../../../../../utils/urlMap";
import Img from "../../../../../components/Img";
import Button from "../../../../../components/RabexButton";
import TwofaMobileModal from "../../../../../components/TwofaMobileModal";
import { useDispatch } from "react-redux";
import { setBlur } from "containers/BlurredModal/actions";
import ChangePasswordModal from "components/ChangePasswordModal";
import TwoFaEmailModal from "components/TwoFaEmailModal";

const TwoFa = () => {
  const [isMyAccount, setIsMyAccount] = useState(false);
  const ChangeAccount = () => {
    setIsMyAccount(!isMyAccount);
  };

  const [Secrets, setSecrets] = useState([]);

  useEffect(() => {
    getSecretList();
  }, []);

  const dispatch = useDispatch();

  const Google2fa = () => {
    dispatch(
      setBlur(TwofaMobileModal, {
        message: "ssss",
      })
    );
  };

  const ChangePassword = () => {
    dispatch(
      setBlur(ChangePasswordModal, {
        message: "ssss",
      })
    );
  };

  const TwoFaEmail = () => {
    dispatch(
      setBlur(TwoFaEmailModal, {
        message: "ssss",
      })
    );
  };

  const getSecretList = () => {
    api
      .get(GetURL("get-secret-list"))
      .then((response) => {
        setSecrets(response.data.data);
      })
      .catch((error) => {
        if (error.data) {
        }
      });
  };

  const AuthStatus = (type) => {
    for (let i = 0; i < Secrets.length; i++) {
      if (Secrets[i].channel_type == type) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Box padding="20px" onClick={ChangeAccount}>
        <P text={<FormattedMessage {...messages.Security2FA} />} />
      </Box>

      <Box marginTop="15px" display={isMyAccount ? "block" : "none"}>
        <Box padding="0 10px" boxShadow="base" rounded="sm" bg="white">
          <Img display="inline" src={require("images/authenticator.svg")} />

          <Box
            marginBottom="20px"
            display="inline-block"
            w={"100%"}
            alignItems="center"
            display="flex"
            verticalAlign="middle"
          >
            <Box display="inline-block" w={"72%"}>
              <P
                textAlign="right"
                display="inline-block"
                marginTop="10px"
                text={<FormattedMessage {...messages.Google2fa} />}
              />
              <P
                color="#708599"
                fontFamily="yekan"
                textAlign="right"
                display="inline-block"
                text={<FormattedMessage {...messages.NeedCodeForWallet} />}
              />
            </Box>

            <Box w={"28%"} textAlign="left" display="inline-block">
              {AuthStatus(2) ? (
                <Button
                  color="#1652f0"
                  fontSize="12px"
                  fontFamily="yekan"
                  bg="#fff"
                  border="1px solid #1652f0"
                  text="faal"
                />
              ) : (
                <Button
                  onClick={(e) => {
                    Google2fa();
                  }}
                  color="#1652f0"
                  fontSize="12px"
                  fontFamily="yekan"
                  bg="#fff"
                  border="1px solid #1652f0"
                  text={<FormattedMessage {...messages.Activate} />}
                />
              )}
            </Box>
          </Box>

          <hr margin="0 0 20px 0" />

          <Img
            display="inline"
            margin="20px 0 0 0"
            src={require("images/mobile2.svg")}
          />

          <Box
            marginBottom="20px"
            display="inline-block"
            w={"100%"}
            alignItems="center"
            display="flex"
            verticalAlign="middle"
          >
            <Box display="inline-block" w={"72%"}>
              <P
                textAlign="right"
                display="inline-block"
                marginTop="10px"
                text={<FormattedMessage {...messages.Mobile2fa} />}
              />
              <P
                color="#708599"
                fontFamily="yekan"
                textAlign="right"
                display="inline-block"
                text={<FormattedMessage {...messages.NeedCodeForWallet} />}
              />
            </Box>

            <Box w={"28%"} textAlign="left" display="inline-block">
              {AuthStatus(0) ? (
                <Button
                  color="#1652f0"
                  fontSize="12px"
                  fontFamily="yekan"
                  bg="#fff"
                  border="1px solid #1652f0"
                  text="faal"
                />
              ) : (
                ''
              )}
            </Box>
          </Box>

          <hr />

          <Img
            display="inline"
            margin="20px 0 0 0"
            height="30px"
            src={require("images/email.svg")}
          />

          <Box
            marginBottom="20px"
            display="inline-block"
            w={"100%"}
            alignItems="center"
            display="flex"
            verticalAlign="middle"
          >
            <Box display="inline-block" w={"72%"}>
              <P
                textAlign="right"
                display="inline-block"
                marginTop="10px"
                text={<FormattedMessage {...messages.Email2fa} />}
              />
              <P
                color="#708599"
                fontFamily="yekan"
                textAlign="right"
                display="inline-block"
                text={<FormattedMessage {...messages.NeedCodeForWallet} />}
              />
            </Box>

            <Box w={"28%"} textAlign="left" display="inline-block">
              {AuthStatus(1) ? (
                <Button
                  color="#1652f0"
                  fontSize="12px"
                  fontFamily="yekan"
                  bg="#fff"
                  border="1px solid #1652f0"
                  text="faal"
                />
              ) : (
                <Button
                  onClick={(e) => {
                    TwoFaEmail();
                  }}
                  color="#1652f0"
                  fontSize="12px"
                  fontFamily="yekan"
                  bg="#fff"
                  border="1px solid #1652f0"
                  text="فعال کردن"
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TwoFa;
