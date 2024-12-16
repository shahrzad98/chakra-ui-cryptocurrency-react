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
import { useDispatch } from "react-redux";
import { setBlur } from "containers/BlurredModal/actions";
import ChangePasswordModal from "components/ChangePasswordModal";
const ChangePassword = () => {
  const [isMyAccount, setIsMyAccount] = useState(false);
  const ChangeAccount = () => {
    setIsMyAccount(!isMyAccount);
  };


  const dispatch = useDispatch();

  const ChangePassword = () => {
    dispatch(setBlur(ChangePasswordModal, {
                    message: "ssss",
                  })
                );
  };

  return (
    <>
      <Box padding="20px 15px" onClick={ChangeAccount}>
        <P text={<FormattedMessage {...messages.ChangePassword} />} />
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
              text={<FormattedMessage {...messages.ChangePassword} />}
            />
          </Box>

          <Box w={"28%"} textAlign="left" display="inline-block">
            <Button
              display="inline-block"
              float="left"
              color="#1652f0"
              onClick={(e)=>{
                ChangePassword()
              }}
              fontSize="12px"
              fontFamily="yekan"
              bg="#fff"
              border="1px solid #1652f0"
              text={<FormattedMessage {...messages.ChangePassword} />}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-start" padding="12px" bg="#f5f7f7">
          <Img height="25px" src={require("images/info.svg")} />
          <P fontFamily="yekan" padding="0 6px 0 0" text="درصورت تغییر کلمه عبور تا 48 ساعت اجازه پرداخت نخواهید داشت" />
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;