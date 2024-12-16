/*
 *
 * Login reducer
 *
 */
import produce from "immer";
import { ACTION_LOGIN, ACTION_LOGOUT } from "./constants";

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case ACTION_LOGIN:
        break;
      case ACTION_LOGOUT:
        break;
    }
  });

export default loginReducer;
