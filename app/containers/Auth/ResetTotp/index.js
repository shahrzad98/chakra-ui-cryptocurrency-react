import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { Link, useHistory, useParams } from "react-router-dom";
import RXMain from "../../../components/RXMain";
import { Box, useDisclosure, Container } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPreviousStep } from "@fortawesome/free-solid-svg-icons";
import { LanguageTools } from "../../../utils/languageTools";

const ResetTotp = () => {
  const history = useHistory();
  const [tasks, setTasks] = useState(history.location.state?.tasks);

  const { step } = useParams();
  const languageTools = new LanguageTools();

  const nextStep = (s) => {
    history.push(`/auth/totp/reset/${s}`, { tasks });
  };

  const previousStep = (s) => {
    if (s > 1) history.push(`/auth/totp/reset/${s - 1}`, { tasks });
  };

  const printMessage = (s) => {
    switch (parseInt(s)) {
      case 1:
        return <StepOne currentStep={1} onNextStep={nextStep} />;

      case 2:
        return <StepTwo currentStep={2} onNextStep={nextStep} />;

      case 3:
        return <StepThree currentStep={3} onNextStep={nextStep} />;

      case 4:
        return <StepFour currentStep={4} onNextStep={nextStep} />;

      case 5:
        return <StepFive currentStep={5} onNextStep={nextStep} />;

      default:
        return <StepOne currentStep={1} onNextStep={nextStep} />;
    }
  };

  return (
    <>
      <RXMain>
        <Box className="m-auto" dir={languageTools.Dir}>
          <FormattedMessage {...messages.restoreTwoFa}>
            {(msg) => (
              <Helmet>
                <title>{msg}</title>
              </Helmet>
            )}
          </FormattedMessage>
          {printMessage(step)}

          <Container className="mr-auto ml-auto mt-2 text-center text-white">
            {step > 1 ? (
              <Link
                className="text-white mr-2 ml-2"
                onClick={(e) => {
                  e.preventDefault();
                  previousStep(step);
                }}
                to=""
              >
                <FontAwesomeIcon icon={["fa", "angle-double-right"]} />{" "}
                <FormattedMessage {...messages.previousstep} />
              </Link>
            ) : null}
            <Link
              className="text-muted mr-2 ml-2"
              onClick={(e) => {
                e.preventDefault();
                history.push("/dashboard");
              }}
              to=""
            >
              <FontAwesomeIcon icon={["fa", "archive"]} />
              <FormattedMessage {...messages.saveandexit} />
            </Link>
          </Container>
        </Box>
      </RXMain>
    </>
  );
};

export default ResetTotp;
