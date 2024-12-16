import React, { useEffect, useState } from "react";
import P from "../../../../components/P";
import { useHistory } from "react-router-dom";
import TokenManager from "../../../../utils/TokenManager";
import BackgroundBody from "./Backgroundbody";
import BackgroundBottom from "./BackgroundBottom";
import { FormattedMessage } from "react-intl";
import Img from "../../../../components/Img";
import messages from "../messages";
import ChannelTranslate from "./channel_translate";
import RabexButton from "../../../../components/RabexButton";
import { api } from "utils/network";
import { GetURL } from "utils/urlMap";

import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  IconButton,
  CircularProgress,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const StepTwo = ({ onNextStep, currentStep }) => {
  const history = useHistory();
  const [otp, setOtp] = useState("");

  const [tasks, setTasks] = useState(history.location.state?.tasks);
  const interval = 120;
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!history.location.state) {
      history.push("/");
    }

    if (countdown > interval) {
      return;
    }
    if (countdown == 2) {
      requestCode();
    }
    const timer = setInterval(() => {
      setCountdown(countdown + 2);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const requestCode = () => {
    api
      .post(GetURL("request-totp"), {
        channel_type: parseInt(tasks?.current_task?.data?.channel_type),
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const login = () => {
    api
      .post(GetURL("login-two-factor"), {
        tasks: tasks.tasks,
        totp: otp,
        channel_type: parseInt(tasks.current_task?.data?.channel_type),
      })
      .then((response) => {
        TokenManager.set(response.data?.data);
        history.push("/dashboard");
        toast.success(<FormattedMessage {...messages.login_success} />);
      });
  };

  return (
    <Box w={["base", "xs", "sm", "lg", "xl"]} margin="auto" padding={"0"}>
      <BackgroundBody>
        <Box fontSize="20px">
          <ChannelTranslate
            channleType={tasks?.current_task?.data?.channel_type}
          />
        </Box>

        <BackgroundBottom>
          <Img src={require("images/mobile.svg")} />

          <P text="کد  شش رقمی را وارد کنید" color="#708599" />
          <InputGroup>
            <Input onChange={(e) => setOtp(e.target.value)} />
            <InputLeftAddon
              children={
                countdown > interval ? (
                  <IconButton
                    colorScheme="teal"
                    variant="link"
                    alignContent="top"
                    onClick={(e) => setCountdown(0)}
                    icon={<FontAwesomeIcon icon={faRedo} />}
                  />
                ) : (
                  <CircularProgress
                    size="30px"
                    value={(100 * countdown) / interval}
                  />
                )
              }
            />
          </InputGroup>

          <RabexButton
            margin="20px 0"
            fontSize="20px"
            width="100%"
            color="#fff"
            borderRadius="4px"
            background="#1652F0"
            text="ادامه"
            height="60px"
            onClick={(e) => {
              if (onNextStep) onNextStep(currentStep + 1);
            }}
          />
        </BackgroundBottom>
        <Button
          fontFamily="yekan"
          textAlign="center"
          colorScheme="teal"
          variant="link"
          alignContent="top"
          onClick={(e) => history.push("/auth/totp/reset")}
        >
          کد دو مرحله‌ای شما کار نمیکند؟
        </Button>
      </BackgroundBody>
    </Box>
  );
};

export default StepTwo;
