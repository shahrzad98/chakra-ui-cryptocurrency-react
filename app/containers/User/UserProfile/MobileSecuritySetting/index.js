import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import messages from "../../messages";
import { useHistory } from "react-router";
import { LanguageTools } from "../../../../utils/languageTools";
import TitleBar from "../../../../components/TitleBar";
import P from "../../../../components/P";
import Img from "../../../../components/Img";
import TwoFa from "./2fa";
import ChangePassword from "./ChangePassword";
import WalletPinCode from "./PinCode";

const MobileSecuritySetting = () => {
  const language = new LanguageTools();
  const history = useHistory();
  const [isMyAccount, setIsMyAccount] = useState(false);

  const ChangeAccount = () => {
    setIsMyAccount(!isMyAccount);
  };
  return (
    <Box
      w={"100%"}
      margin="15px 10px 0 10px"
      dir={language.Dir}
      className={language.Align}
      
      display={{ base: "block", md: "none" }}
    >
      <TitleBar
        children={<FormattedMessage {...messages.SecuritySetting} />}
        color="#fff"
        height="70px"
        icon={require("images/security.svg")}
        background="rgb(22, 82, 240)"
      />

      <Box
        w={"100%"}
        boxShadow="md"
        padding="12px 10px"
        bg="#fff"
        textAlign="right"
      >
        <Flex
          onClick={(e) => {
            history.push(`/dashboard/profile`);
          }}
          textAlign="right"
          dir="rtl"
        >
          <Img src={require("images/icon _arrow_right.svg")} />
          <P
            padding="0 10px 0 0"
            fontFamily="yekan"
            text={<FormattedMessage {...messages.SecuritySetting} />}
          />
        </Flex>
      </Box>

       <Box marginTop="10px" boxShadow="base" rounded="sm" bg="white">
         <TwoFa />
       </Box>

       <Box marginTop="10px" boxShadow="base" rounded="sm" bg="white">
         <ChangePassword />
       </Box>

       <Box marginTop="10px" boxShadow="base" rounded="sm" bg="white">
         <WalletPinCode />
       </Box>

       <Box
        padding="20px 15px"
        marginTop="10px"
        boxShadow="base"
        rounded="sm"
        bg="white"
      >
        <P text={<FormattedMessage {...messages.AccountManagement} />} />
      </Box>

      <Box marginTop="10px" padding="20px 15px" boxShadow="base" rounded="sm" bg="white">
        <P text={<FormattedMessage {...messages.WhiteAddressManagement} />} />
      </Box>
    </Box>
  );
};

export default MobileSecuritySetting;
