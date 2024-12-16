import React, { useEffect, useState } from 'react';
import BackgroundBox from '../BackgroundBox';
import P from '../../../../components/P';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Img from '../../../../components/Img';

import RabexButton from '../../../../components/RabexButton';
import DocumentSelfie from 'images/documentandselfi.svg';

const StepOne = ({ onNextStep, currentStep }) => {
  return (
    <>
      <p className="text-center mb-3 text-white">
        <FormattedMessage {...messages.restoreTwoFa} />
      </p>
      <BackgroundBox>
        <DocumentSelfie />
        <P
          text={<FormattedMessage {...messages.senddocuments} />}
          textAlign="right"
        />

        <P
          text={<FormattedMessage {...messages.stepthreesectionone} />}
          textAlign="right"
          fontFamily="yekan"
        />

        <P
          text={<FormattedMessage {...messages.handtype} />}
          textAlign="right"
        />

        <P
          text={<FormattedMessage {...messages.stepthreesectiontwo} />}
          textAlign="right"
          fontFamily="yekan"
        />

        <P
          text={<FormattedMessage {...messages.Valididentification} />}
          textAlign="right"
        />

        <P
          text={<FormattedMessage {...messages.documentsnames} />}
          textAlign="right"
          fontFamily="yekan"
        />

        <RabexButton
          background="#1652F0"
          color="#fff"
          borderRadius="4px"
          padding="10px"
          width="100%"
          text={<FormattedMessage {...messages.NextStep} />}
          onClick={e => {
            if (onNextStep) onNextStep(currentStep + 1);
          }}
        />
      </BackgroundBox>
    </>
  );
};

export default StepOne;
