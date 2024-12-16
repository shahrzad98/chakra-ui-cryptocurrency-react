/**
 *
 * ChangePasswordModal
 *
 */

import { Box, Flex } from "@chakra-ui/layout";
import React, { memo, useState, useEffect } from "react";
import P from "../P";
import Input from "../Input";
import Button from "../RabexButton";
import { api } from "../../utils/network";
import { GetStatic, GetURL } from "../../utils/urlMap";
import { set } from "lodash";
import { FormattedMessage } from "react-intl";
import messages from "../../containers/User/messages";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ChangePasswordModal() {
  const [Step, setStep] = useState(1);
  const [tasks, setTasks] = useState("");
  const [form, setForm] = useState({
    totp: "",
    google_code: "",
    password: "",
    password_confirm: "",
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
      
      })
      .then(() => sendToTp());
  };

  const sendToTp = () => {
    api
      .post(GetURL("request-totp"), { tasks: tasks })
      .then((response) => {
       
      })
      .catch((error) => {
        if (error.data) {
        }
      });
  };

  const changePassword = () => {
    api
      .put(GetURL("change-password"), form)
      .then((response) => {
      })
      .catch((error) => {
        if (error.data) {
        }
      });
  };

  return (
    <>
      <Box
        w="100%"
        minHeight="200px"
        bg="#fff"
        margin="0 auto"
        borderRadius="4px"
        boxShadow="xs"
        w={{ base: "100%", md: "20%", lg: "25%", xl: "25%" }}
        padding="35px 30px"
      >
        
        <Box display={Step == 1 ? "block" : "none"}>
          <Text fontSize="24px" textAlign="right">
          {<FormattedMessage {...messages.ChangePassword} />}
          </Text>
          <Text
            textAlign="right"
            margin="25px 0 6px 0"
            color="#767676"
            
          >
            {<FormattedMessage {...messages.ConfirmMobileNumber} />}
          </Text>
          <Flex>
            <Button
              border="1px solid #ECEFF1"
              color="#1652f0"
              lineHeight="unset"
              margin="0 8px 0 0"
              background="#fff"
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
          <Text
            textAlign="right"
            margin="5px 0 0 0"
            color="#767676"
            
          >کد ارسالی به شماره 00000000 را وارد کنید</Text>

          <Text
            textAlign="right"
            margin="25px 0 6px 0"
            color="#767676"
          
          >
            {<FormattedMessage {...messages.ConfirmGoogleAuth} />}
          </Text>
          <Input
            onChange={(e) => {
              setForm({ ...form, google_code: e.target.value });
            }}
            border="1px solid #ECEFF1"
          />
          <Text
            textAlign="right"
            margin="5px 0 0 0"
            color="#767676"
            
          >{<FormattedMessage {...messages.CreateGoogleAuth} />}</Text>
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

        <Box display={Step == 2 ? "block" : "none"}>
          <Text fontSize="24px" textAlign="right" >{<FormattedMessage {...messages.ChangePassword} />}</Text>
          <Text
            margin="45px 0 8px 0"
            color="#767676"
            textAlign="right"
          >{<FormattedMessage {...messages.NewPassword} />} </Text>
          <Input
          type="password"
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            border="1px solid #ECEFF1"
          />

          <Text
            margin="20px 0 8px 0"
            color="#767676"
            textAlign="right"
          >{<FormattedMessage {...messages.ConfirmPassword} />}</Text>

          <Input
          type="password"
            onChange={(e) => {
              setForm({ ...form, password_confirm: e.target.value });
            }}
            border="1px solid #ECEFF1"
          />

          <Button
            onClick={(e) => {
              changePassword();
            }}
            margin="40px 0 0 0"
            padding="26px 76px"
            color="#fff"
            background="#1652f0"
          >
            {<FormattedMessage {...messages.ChangePassword} />}
          </Button>
        </Box>
      </Box>
    </>
  );
}

ChangePasswordModal.propTypes = {};

export default memo(ChangePasswordModal);
