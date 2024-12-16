import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the blurredModal state domain
 */

const selectWebsocketDomain = (state) => state.websocket || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlurredModal
 */

const makeWebsocket = () =>
  createSelector(
    selectWebsocketDomain,
    (substate) => substate
  );

export default makeWebsocket;
export { selectWebsocketDomain };
