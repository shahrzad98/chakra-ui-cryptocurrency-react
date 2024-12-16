import React from 'react';
import * as constants from 'utils/constants';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ChannelTranslate = ({ channelId }) => {
  const print = () => {
    switch (channelId) {
      case constants.CHANNEL_SMS:
        return <FormattedMessage {...messages.sms_verification} />;
      case constants.CHANNEL_EMAIL:
        return <FormattedMessage {...messages.sms_verification} />;

      case constants.CHANNEL_AUTHENTICATOR_APP:
        return (
          <FormattedMessage {...messages.authenticator_app_verification} />
        );
      default:
        return 'ok';
    }
  };

  return print();
};

export default ChannelTranslate;
