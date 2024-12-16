/*
 * Toast Messages
 *
 * This contains all the text for the Toast container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Toast';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Toast container!',
  },
});
