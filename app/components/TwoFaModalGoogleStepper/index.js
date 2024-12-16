import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import P from "../P";
import Img from "../Img";
import Input from "../Input";
import Button from "../RabexButton";
import messages from "../../containers/User/messages";
import { FormattedMessage } from "react-intl";
import CounterContext from "./context";
import "./stepper.css";
import { propNames } from "@chakra-ui/styled-system";
import { api } from "../../utils/network";
import { GetStatic, GetURL } from "../../utils/urlMap";
const steps = [
  { label: "دانلود برنامه" },
  { label: "اسکن QR" },
  { label: "عبارت بازیابی" },
  { label: "فعالسازی" },
];

function DoneIcon() {
  return "✓";
}

function StepContent({ done, index }) {
  return done ? <DoneIcon /> : index + 1;
}

function renderStep({ label }, key) {
  const { current } = this;
  const done = key < current;
  const currentStep = key === current;
  const currentClassName = currentStep ? " stepper__step--current" : "";
  const doneClassName = done ? " stepper__step--done" : "";
  const className = `stepper__step${currentClassName}${doneClassName}`;

  return (
    <li className={className} key={key}>
      <Heading
        position="relative"
        bottom="8px"
        fontFamily="yekan"
        opacity={{ base: current == key ? "1" : "0", md: "1" }}
        className="stepper__step__label"
        as="h6"
        size="xs"
      >
        {label}
      </Heading>
      <span className="stepper__step__index">
        <StepContent dir="rtl" done={done} index={key} />
      </span>
    </li>
  );
}

function Stepper({ current, steps }) {
  return <ul className="stepper">{steps.map(renderStep, { current })}</ul>;
}

function StepperState({ secrets }) {
  const AuthStatus = (type) => {
    for (let i = 0; i < secrets.length; i++) {
      if (secrets[i].channel_type == type) {
        return true;
      }
    }
    return false;
  };

  const [current, setCurrent] = React.useState(0);

  const handleNext = () => {
    setCurrent(Math.min(current + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrent(Math.max(current - 1, 0));
  };

  const [QRCode, setQRCode] = useState({
    image: "",
    secret: "",
  });

  const [form, setForm] = useState({
    mobileToTp: "",
    EmailToTp: "",
  });

  
  const [Tasks, SetTasks] = useState();

  const getQRCode = () => {
    api
      .get(GetURL("users-mfa-google"))
      .then((response) => {
        setQRCode({
          ...QRCode,
          image: response?.data?.image,
          secret: response?.data?.secret,
        });
        SetTasks(response?.data.task_list?.tasks);
      })
      .catch((error) => {
        if (error.data) {
        }
      });
  };

  const getEmailTask = () => {
    api
    .get(GetURL("users-mfa-google"))
    .then((response) => {
      // SetTasks(response.data.data.task_list.tasks);
      // sendToTp();
    })
    .catch((error) => {
      if (error.data) {
      }
    });
  }

  useEffect(() => {
    if (current == 1) {
      getQRCode();
    }
    if (current == 3) {
      sendToTp();
    }
    if (current==4) {
      sendGoogleAuth();
    }
  }, [current]);


  const sendGoogleAuth = () =>{
    api
    .post(GetURL("users-mfa-google"),{totp:form.mobileToTp,tasks:Tasks})
    .then((response) => {
      
    })
    .catch((error) => {
      if (error.data) {
      }
    });
  }

    const sendToTp = ()=>{
      api
      .post(GetURL("request-totp"),{tasks:Tasks})
      .then((response) => {
      })
      .catch((error) => {
        if (error.data) {
        }
      });
    }




  function renderStepperContent(current) {
    let content;
    switch (current) {
      case 0:
        content = (
          <Box dir="rtl">
            <>
              <P text={<FormattedMessage {...messages.OneStep} />} />
              <P
                fontFamily="yekan"
                color="#050f19"
                padding="6px 0 0 0"
                text={<FormattedMessage {...messages.DownloadGoogleAuth} />}
              />
              <Flex justifyContent="center" textAlign="center">
                <Box
                  border="1px solid #ECEFF1"
                  padding="10px 0"
                  w={{
                    base: "150px",
                    xs: "200px",
                    md: "200px",
                    lg: "200px",
                    xl: "200px",
                  }}
                  margin="0 0 0 10px"
                >
                  <Box
                    width={{
                      base: "150px",
                      md: "200px",
                      lg: "200px",
                      xl: "200px",
                    }}
                    display="inline-block"
                    verticalAlign="middle"
                  >
                    <Img
                      display="inline"
                      height="30px"
                      src={require("images/googleplay.svg")}
                    />
                    <Box display="inline-block" verticalAlign="middle">
                      <P
                        fontFamily="yekan"
                        padding="0 10px 0 0"
                        text={<FormattedMessage {...messages.Downloadvia} />}
                      />
                      <P
                        padding="0 10px 0 0"
                        text={<FormattedMessage {...messages.GooglePlay} />}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  border="1px solid #ECEFF1"
                  padding="10px 0"
                  w={{
                    base: "150px",
                    xs: "200px",
                    md: "200px",
                    lg: "200px",
                    xl: "200px",
                  }}
                  margin="0 10px 0 0"
                >
                  <Box
                    width={{
                      base: "150px",
                      md: "200px",
                      lg: "200px",
                      xl: "200px",
                    }}
                    display="inline-block"
                    verticalAlign="middle"
                  >
                    <Img
                      display="inline"
                      height="30px"
                      src={require("images/apple.svg")}
                    />
                    <Box display="inline-block" verticalAlign="middle">
                      <P
                        fontFamily="yekan"
                        padding="0 10px 0 0"
                        text={<FormattedMessage {...messages.Downloadvia} />}
                      />
                      <P
                        padding="0 10px 0 0"
                        text={<FormattedMessage {...messages.AppleStore} />}
                      />
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </>
          </Box>
        );
        break;
      case 1:
        content = (
          <>
            <Box dir="rtl">
              <P
                margin="20px 0 0 0"
                text={<FormattedMessage {...messages.StepTwo} />}
              />
              <P
                fontFamily="yekan"
                margin="16px 0 0 0"
                text={<FormattedMessage {...messages.ScanGoogleAuth} />}
              />
              <Img
                margin="0 auto"
                src={`data:image/png;base64,${QRCode.image}`}
              />
              <P
                margin="20px 0 0 0"
                fontFamily="yekan"
                text={<FormattedMessage {...messages.GoogleAuthCode} />}
              />
              <P margin="15px  0 0 0" fontFamily="yekan" text={QRCode.secret} />
            </Box>
          </>
        );
        break;
      case 2:
        content = (
          <Box dir="rtl">
            <>
              <P
                margin="20px 0 0 0"
                text={<FormattedMessage {...messages.StepThree} />}
              />
              <P
                margin="10px 0 0 0"
                fontFamily="yekan"
                text={<FormattedMessage {...messages.WriteGoogleAuthCode} />}
              />

              <Box display="flex" justifyContent="center" marginTop="20px">
                <P
                  display="flex"
                  alignItems="flex-end"
                  text={QRCode.secret}
                  fontFamily="yekan"
                />
                <Img margin="0 42px 0 0" src={require("images/notepad.svg")} />
              </Box>

              <P
                margin="20px 0 0 0"
                fontFamily="yekan"
                text={<FormattedMessage {...messages.Pending2fa} />}
              />
            </>
          </Box>
        );
        break;
      case 3:
        content = (
          <Box dir="rtl">
            <>
              <P
                margin="20px 0 0 0"
                text={<FormattedMessage {...messages.StepFour} />}
              />
              <P
                fontFamily="yekan"
                margin="10px 0 0 0"
                text={<FormattedMessage {...messages.ActiveGoogleAuth} />}
              />

              {AuthStatus(0) ? (
                <>
                  <P
                    fontFamily="yekan"
                    textAlign="right"
                    text={
                      <FormattedMessage {...messages.ConfirmMobileNumber} />
                    }
                  />
                  <Flex>
                    <Input
                      margin="0 0 0 10px"
                      type="text"
                      border="1px solid #b5c0ca"
                      onChange={(e)=>{
                        setForm({ ...form, mobileToTp: e.target.value });
                      }}
                    />
                    <Button fontFamily="yekan" padding="0 30px">
                      {<FormattedMessage {...messages.sendCode} />}
                    </Button>
                  </Flex>
                  <P
                    fontFamily="yekan"
                    textAlign="right"
                    text="کد شش رقمی ارسالی به شماره 00000000 را وارد کنید"
                  />
                </>
              ) : (
                ""
              )}

              {AuthStatus(1) ? (
                <>
                  <P
                    fontFamily="yekan"
                    margin="15px 0 0 0"
                    textAlign="right"
                    text={<FormattedMessage {...messages.Email2fa} />}
                  />
                  <Flex>
                    <Input
                      margin="0 0 0 10px"
                      type="text"
                      border="1px solid #b5c0ca"
                      onChange={(e)=>{
                        setForm({ ...form, EmailToTp: e.target.value });
                      }}
                    />
                    <Button onClick={(e)=>{
                      getEmailTask()
                    }} fontFamily="yekan" padding="0 30px">
                      {<FormattedMessage {...messages.sendCode} />}
                    </Button>
                  </Flex>
                </>
              ) : (
                ""
              )}

              <P
                fontFamily="yekan"
                margin="15px 0 0 0"
                textAlign="right"
                text={<FormattedMessage {...messages.ConfirmGoogleAuth} />}
              />
              <Input
                margin="0 0 0 10px"
                type="text"
                border="1px solid #b5c0ca"
              />
              <P
                fontFamily="yekan"
                textAlign="right"
                text={<FormattedMessage {...messages.CreateGoogleAuth} />}
              />
            </>
          </Box>
        );

        break;
      default:
        break;
    }
    return content;
  }
  return (
    <>
      <Stepper steps={steps} current={current} />
      {renderStepperContent(current)}
      <Flex justifyContent="center">
        <Button onClick={handleNext}>مرحله بعد</Button>
        <Button onClick={handlePrevious}>بازگشت</Button>
      </Flex>
    </>
  );
}

function App(props) {
  return <StepperState secrets={props.secrets} dir="rtl" />;
}

export default App;
