/**
 *
 * TwoFaEmailModal
 *
 */

import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FormattedMessage } from "react-intl";
import messages from "../../containers/User/messages";
import { Box, Stack, Text, VStack } from "@chakra-ui/layout";
import Button from "components/RabexButton";
import Input from "components/Input";
import Img from "components/Img";
import { api } from "../../utils/network";
import { GetStatic, GetURL } from "../../utils/urlMap";
function TwoFaEmailModal() {
  const [ProgressValue, setProgressValue] = useState(120);
  const [ContinueButton, setContinueButton] = useState("disabled");
  const [Step, setStep] = useState(1);

  const InsideProgress = styled.div`
    position: absolute;
    right: 15px;
    z-index: 99999;
    top: 12px;
  `;

  const [form, setForm] = useState({
    totp: "",
    tasks: "",
  });

  useEffect(() => {
    getMobileTask();
  },[]);

  useEffect(() => {
    if (ProgressValue > 0) {
      const timer = setInterval(() => {
        setProgressValue(ProgressValue - 1);
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [ProgressValue]);

  const ChangeCodeLength = (e) => {
    if (e.length == 6) setContinueButton("");
    else setContinueButton("disabled");
  };

  const NextStep = () => {
    setStep(Step + 1);
  };

  const getMobileTask = () => {
    api
      .get(GetURL("users-mfa-email"))
      .then((response) => {
        sendToTp(response.data.data.task_list.tasks);
        setForm({
          ...form,
          tasks: response.data.data.task_list.tasks,
        });
      })
      .catch((error) => {
        if (error.data) {
        }
      });
  };

  const sendToTp = (task)=>{
    api
    .post(GetURL("request-totp"),{tasks:task})
    .then((response) => {

    })
    .catch((error) => {
      if (error.data) {
      }
    });
  }


  const sendEmailTask = () => {
    api
      .post(GetURL("users-mfa-email"),form)
      .then((response) => {
        setForm({
          ...form,
          tasks: response.data.data.task_list.tasks,
        });
        sendToTp(response.data.data.task_list.tasks);
      })
      .catch((error) => {
        if (error.data) {
        }
      });
  };

  const EmailActive = ()=>{
    api
    .post(GetURL("users-mfa-email"),form)
    .then((response) => {
    
    })
    .catch((error) => {
      if (error.data) {
      }
    });
  }


  return (
    <Stack
      bg="#fff"
      w={{ base: "100%", md: "35%", lg: "35%", xl: "35%" }}
      margin="0 auto"
      boxShadow="md"
      borderRadius="4px"
    >
      <Box display={Step == 1 ? "block" : "none"}>
        <Text padding="15px 0 10px 0">
          {<FormattedMessage {...messages.Mobile2FaActive} />}
        </Text>

        <Box textAlign="center" w="100%">
          <Text>
            کد شش رقمی که از سمت رابکس به شماره ......... ارسال شد را وارد
            نمایید
          </Text>

          <Box padding="20px" bgGradient="linear-gradient(#fafafa, white)">
            <Stack alignItems="center" direction={["row"]} marginTop="20px">
              <Box textAlign="right" w={"85%"}>
                <Text color="#708599" padding="0 20px 0 0">
                  کد شش رقمی را وارد کنید
                </Text>
                <Box position="relative">
                  <InsideProgress>
                    <Box w="15px">
                      <CircularProgressbar
                        value={ProgressValue}
                        maxValue="120"
                        minValue="0"
                        counterClockwise={true}
                        strokeWidth={50}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          trailColor: "#fff",
                          position: "absolute",
                        })}
                      />
                    </Box>
                  </InsideProgress>
                </Box>
                <Input
                  border="1px solid #b5c0ca"
                  background="#fff"
                  type="number"
                  onChange={(e) => {
                    ChangeCodeLength(e.target.value);setForm({ ...form, totp: e.target.value });
                  }}
                />
              </Box>
              <Box textAlign="right" w={"15%"}>
                <Img
                  margin="auto 0 auto auto"
                  src={require("images/mobile.svg")}
                />
              </Box>
            </Stack>

            <VStack w="100%" marginTop="20px">
              <Button
                height="52px"
                disabled={ContinueButton}
                background="#1652f0"
                color="#fff"
                w="100%"
                onClick={(e) => {
                  NextStep();
                  sendEmailTask();
                }}
                text="ادامه"
              />
              <Button
                height="52px"
                background="#fff"
                border="1px solid #d7dbdb"
                w="100%"
                text="ارسال مجدد کد تاییدیه"
              />
            </VStack>
          </Box>
        </Box>
      </Box>

      <Box display={Step == 2 ? "block" : "none"}>
        <Text padding="15px 0 10px 0">
          {<FormattedMessage {...messages.Email2FaActive} />}
        </Text>

        <Box textAlign="center" w="100%">
          <Text marginTop="20px" fontFamily="yekan" padding="15px 0 10px 0">
            لطفا کد شش رقمی که از سمت رابکس به ایمیل .........ارسال شد را وارد
            کنید
          </Text>
          <Box padding="20px" bgGradient="linear-gradient(#fafafa, white)">
            <Stack alignItems="center" direction={["row"]} marginTop="20px">
              <Box textAlign="right" w={"85%"}>
                <Text color="#708599" padding="0 20px 0 0">
                  کد شش رقمی را وارد کنید
                </Text>
                <Box position="relative">
                  <InsideProgress>
                    <Box w="15px">
                      <CircularProgressbar
                        value={ProgressValue}
                        maxValue="120"
                        minValue="0"
                        counterClockwise={true}
                        strokeWidth={50}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          trailColor: "#fff",
                          position: "absolute",
                        })}
                      />
                    </Box>
                  </InsideProgress>
                </Box>
                <Input
                  border="1px solid #b5c0ca"
                  background="#fff"
                  type="number"

                  onChange={(e) => {
                    ChangeCodeLength(e.target.value);setForm({ ...form, totp: e.target.value });
                  }}
                />
              </Box>
              <Box textAlign="right" w={"15%"}>
                <Img
                  margin="auto 0 auto auto"
                  src={require("images/mobile.svg")}
                />
              </Box>
            </Stack>

            <VStack w="100%" marginTop="20px">
              <Button
                height="52px"
                disabled={ContinueButton}
                background="#1652f0"
                color="#fff"
                w="100%"
                onClick={(e) => {
                  NextStep();
                  EmailActive();
                }}
                text="فعالسازی"
              />
              <Button
                height="52px"
                background="#fff"
                border="1px solid #d7dbdb"
                w="100%"
                text="ارسال مجدد کد تاییدیه"
              />
            </VStack>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

TwoFaEmailModal.propTypes = {};

export default TwoFaEmailModal;
