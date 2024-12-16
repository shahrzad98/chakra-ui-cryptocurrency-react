import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { GetWebsocket, GetURL } from 'utils/urlMap';

import { api } from 'utils/network';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../components/Toast/actions';
import { useInjectReducer } from '../../../utils/injectReducer';
import reducer from './reducer';
import { publishOrderUpdateEvent, publishPriceTickerEvent } from './actions';
const RWebSocket = ({ children }) => {
  const dispatch = useDispatch();
  const [client, setClient] = useState(null);
  const WebsocketContext = createContext();
  // in websockets, modern browsers does not let us set headers other than cookies
  // thus, we use tickets
  // firstly, we create a ticket, then we would return to it
  // and establish a new socket
  useEffect(() => {
    // if (!token.authenticated() || client) return;
    // get ticket

    api
      .get(GetURL('ws-ticket'))
      .then(response => {
        connectWebsocket(response.data.data?.pkey);
      })
      .catch(error => {});
  }, []);

  useInjectReducer({ key: 'socketAction', reducer });

  const connectWebsocket = pkey => {
    const socket = new WebSocket(`${GetWebsocket()}/${pkey}`);

    socket.onmessage = message => {
      if (!message.data) return;

      let m = JSON.parse(message.data);

      switch (m.id) {
        case 1:
          dispatch(showToast('Order submitted', 'top', 'success'));

          dispatch(publishOrderUpdateEvent(m));
          return;
        case 2:
          return;
        case 6:
          dispatch(publishPriceTickerEvent(m));
          return;
        case 8:
          dispatch(publishOrderbookUpdateEvent(m));
        default:
          return;
      }
    };
    setClient(socket);
  };

  return <WebsocketContext.Provider>{children}</WebsocketContext.Provider>;
};

export { RWebSocket };
