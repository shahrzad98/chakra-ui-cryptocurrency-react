import React, { useEffect, useState } from "react";
import BackgroundBox from "../BackgroundBox";
import P from "../../../../components/P";
import messages from "../messages";
import { FormattedMessage } from "react-intl";
import {StepOneAuth} from '../../../../images/icon'

import RabexButton from "../../../../components/RabexButton";

const StepOne = ({ onNextStep, currentStep }) => {
  return (
    <>
      <p className="text-center mb-3 text-white">
        <FormattedMessage {...messages.restoreTwoFa} />
      </p>
      <BackgroundBox>
        <StepOneAuth height="114px" width="114px" />
        <P
          margin="10px auto"
          fontSize="17px"
          textAlign="center"
          fontFamily="yekan"
          color="#050F19"
          text={<FormattedMessage {...messages.restoreTwoFa} />}
        />

        <P
          margin="10px auto"
          fontSize="13px"
          textAlign="center"
          fontFamily="yekanb"
          color="#708599"
          text={<FormattedMessage {...messages.steponesectionone} />}
        />

        <P
          margin="10px auto"
          fontSize="13px"
          textAlign="center"
          fontFamily="yekan"
          color="#708599"
          text={<FormattedMessage {...messages.steponesectiontwo} />}
        />

        <RabexButton
          background="#1652F0"
          color="#fff"
          borderRadius="4px"
          padding="10px"
          width="100%"
          text={<FormattedMessage {...messages.nextStep} />}
          onClick={(e) => {
            if (onNextStep) onNextStep(currentStep + 1);
          }}
        />
      </BackgroundBox>
    </>
  );
};

export default StepOne;
