/**
 *
 * ChangePineCodeModal
 *
 */

import { Stack, Box, Flex } from "@chakra-ui/layout";
import React, { memo, useState,useEffect } from "react";
import Img from "../Img";
import P from "../P";
import Button from "../RabexButton";
import { FormattedMessage } from "react-intl";
import messages from "../../containers/User/messages";
import Input from "../Input";
import { api } from "../../utils/network";
import { GetStatic, GetURL } from "../../utils/urlMap";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ChangePineCodeModal() {
  const [Step, setStep] = useState(1);
  const [tasks, setTasks] = useState("");
  const [form, setForm] = useState({
    totp: "",
    google_auth_code: "",
    pin: "",
    pin_confirm: "",
    tasks: "",
  });

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    api
      .post(GetURL("request-change-password"), {})
      .then((response) => {
        setTasks(response.data.data.task_list.tasks);

        setForm({
          ...form,
          tasks: response.data.data.task_list.tasks,
        });
      })
      .catch((error) => {
        
      });
  };

  const sendToTp = () =>{
    api
    .post(GetURL("request-totp"), { tasks: tasks })
    .then((response) => {

    })
    .catch((error) => {
      if (error.data) {
      }
    });
  }

  const savePineCode = ()=>{
    api
    .put(GetURL("update-pine"), form)
    .then((response) => {

    })
    .catch((error) => {
      if (error.data) {
      }
    });
  }

  const nextStep = () => {
    setStep(Step + 1);
  };

  return (
    <Stack
      w="100%"
      minHeight="200px"
      bg="#fff"
      margin="0 auto"
      borderRadius="4px"
      boxShadow="xs"
      w={{ base: "100%", md: "25%", lg: "25%", xl: "25%" }}
    >
      <Box padding="35px 30px" display={Step == 1 ? "block" : "none"}>
        <Img
          margin="0 auto"
          height="100px"
          src={require("images/pincodewallet.svg")}
        />

        <P
          textAlign="center"
          margin="15px 0"
          text="پین کد کیف پول"
          fontFamily="yekan"
        />
        <P
          color="#708599"
          textAlign="right"
          text="پین کد ۴ رقمی کیف پول برای ورود به کیف پول و مدیریت آن الزامیست"
        />
        <P
          color="#708599"
          textAlign="right"
          text="این پین کد به هیچ عنوان قایل بازیابی نیست و باید آن را به خاطر بسپارید"
        />
        <P
          margin=" 0 0 30px 0"
          color="#708599"
          textAlign="right"
          text="این پین کد را بر روی کاغذ یادداشت کرده و در جایی امن نگهداری کنید"
        />
        <Button
          margin="20px 0 0 0"
          background="#1652f0"
          height="60px"
          width="100%"
          color="#fff"
          onClick={(e) => {
            nextStep();
          }}
        >
          قبول
        </Button>
      </Box>

      <Box padding="35px 30px" display={Step == 2 ? "block" : "none"}>
        <P text="تعیین پین کد" fontSize="24px" textAlign="right" />

        <P
          color="#767676"
          margin="30px 0 8px 0"
          text="تایید شماره همراه"
          textAlign="right"
        />

        <Flex>
          <Button
            border="1px solid #ECEFF1"
            color="#1652f0"
            lineHeight="unset"
            margin="0 8px 0 0"
            background="#fff"
            onClick={sendToTp}
          >
            {<FormattedMessage {...messages.sendCode} />}
          </Button>
          <Input
            onChange={(e) => {
              setForm({ ...form, totp: e.target.value });
            }}
            border="1px solid #ECEFF1"
          />
        </Flex>
        <P
          color="#767676"
          margin="5px 0 8px 0"
          text="کد شش رقمی به شماره 000000 را وارد کنید"
          textAlign="right"
        />

        <P
          textAlign="right"
          margin="25px 0 6px 0"
          color="#767676"
          text={<FormattedMessage {...messages.ConfirmGoogleAuth} />}
        />
        <Input
          onChange={(e) => {
            setForm({ ...form, google_auth_code: e.target.value });
          }}
          border="1px solid #ECEFF1"
        />
        <P
          textAlign="right"
          margin="5px 0 0 0"
          color="#767676"
          text={<FormattedMessage {...messages.CreateGoogleAuth} />}
        />

        <Button
          onClick={(e) => {
            setStep(Step + 1);
          }}
          margin="40px 0 0 0"
          padding="26px 76px"
          color="#fff"
          background="#1652f0"
        >
          {<FormattedMessage {...messages.NextStep} />}
        </Button>
      </Box>

      <Box display={Step == 3 ? "block" : "none"}>
        <P
          padding="35px 30px"
          text="تعیین پین کد"
          fontSize="24px"
          textAlign="right"
        />
        <P
          fontSize="16px"
          padding="0 30px"
          margin="15px 0 40px 0"
          fontFamily="yekan"
          text="لطفا پین کد 4 رقمی ورود به کیف پول رابکس خود را تعیین کنید"
          textAlign="right"
        />

        <Box padding="30px 35px" bg="#fafafa">
          <P
            color="#708599"
            margin="0 0 4px 0"
            textAlign="right"
            text="پین کد ۴ رقمی خود را وارد کنید"
          />
          <Input   onChange={(e) => {
            setForm({ ...form, pin: e.target.value });
          }} border="1px solid #ECEFF1" />

          <P
            color="#708599"
            textAlign="right"
            margin="20px 0 4px 0"
            text="تکرار پین کد"
          />
          <Input   onChange={(e) => {
            setForm({ ...form, pin_confirm: e.target.value });
          }} border="1px solid #ECEFF1" />
        </Box>

        <Button
          margin="40px 0 15px 0"
          padding="26px 76px"
          color="#fff"
          onClick={(e) => {
            savePineCode()
          }}
          background="#1652f0"
        >
          تایید
        </Button>
      </Box>

    
    </Stack>
  );
}

ChangePineCodeModal.propTypes = {};

export default memo(ChangePineCodeModal);
