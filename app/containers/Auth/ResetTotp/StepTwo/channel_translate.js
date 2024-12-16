import React from "react";
import * as constants from "utils/constants";
import { FormattedMessage } from "react-intl";
import messages from "../messages";

const ChannelTranslates = ({ channleType }) => {
  const print = () => {
    switch (channleType) {
      case constants.CHANNEL_SMS:
        return <FormattedMessage {...messages.smsverification} />;
      case constants.CHANNEL_EMAIL:
        return <FormattedMessage {...messages.smsverification} />;

      case constants.CHANNEL_AUTHENTICATOR_APP:
        return (
          <FormattedMessage {...messages.authenticatorappverification} />
        );

        default:
         return <></>;
    }
  };

  return print();
};

export default ChannelTranslates;
