import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import messages from "../../../messages";
import { useHistory } from "react-router";
import { LanguageTools } from "../../../../../utils/languageTools";
import TitleBar from "../../../../../components/TitleBar";
import P from "../../../../../components/P";
import Img from "../../../../../components/Img";
import Button from "../../../../../components/RabexButton";
import PineCodeModal from "../../../../../components/PineCodeModal";
import { useDispatch } from "react-redux";
import { setBlur } from "containers/BlurredModal/actions";

const TwoFa = () => {
  const [isMyAccount, setIsMyAccount] = useState(false);
  const ChangeAccount = () => {
    setIsMyAccount(!isMyAccount);
  };


  const dispatch = useDispatch();
  const setPineCode = () => {
    dispatch(setBlur(PineCodeModal, {
      message: "ssss",
    }));
  };

  return (
    <>
      <Box padding="20px 15px" onClick={ChangeAccount}>
        <P text={<FormattedMessage {...messages.WalletPinCode} />} />
      </Box>

      <Box padding="0 15px 10px 15px" display={isMyAccount ? "block" : "none"}>
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
              display="inline-block"
              fontFamily="yekan"
              text={<FormattedMessage {...messages.NeedPinCodeForWallet} />}
            />
          </Box>

          <Box w={"28%"} textAlign="left" display="inline-block">
            <Button
              display="inline-block"
              float="left"
              color="#1652f0"
              onClick={(e) => {
                setPineCode();
              }}
              fontSize="12px"
              fontFamily="yekan"
              bg="#fff"
              border="1px solid #1652f0"
              text={<FormattedMessage {...messages.SetWalletPinCode} />}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" padding="12px" bg="#f5f7f7">
          <Img height="25px" src={require("images/info.svg")} />
          <P
            fontFamily="yekan"
            padding="0 6px 0 0"
            text={<FormattedMessage {...messages.NeedPinCodeForWalletSecOne} />}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          padding="0 12px 12px 12px"
          bg="#f5f7f7"
        >
          <Img height="25px" src={require("images/info.svg")} />
          <P
            fontFamily="yekan"
            padding="0 6px 0 0"
            text={<FormattedMessage {...messages.NeedPinCodeForWalletSecTwo} />}
          />
        </Box>
      </Box>
    </>
  );
};

export default TwoFa;
