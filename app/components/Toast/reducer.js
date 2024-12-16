/*
 *
 * Toast reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SHOW_TOAST } from './constants';

export const initialState = { title: '', position: '', status: '', counter: 1 };
let counter = 0;
/* eslint-disable default-case, no-param-reassign */
const toastReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case SHOW_TOAST:
        draft.position = action.payload.position;
        draft.title = action.payload.title;
        draft.status = action.payload.status;
        draft.counter = ++counter;
        break;
    }
  });

export default toastReducer;
