/*
 *
 * BlurredModal reducer
 *
 */
import produce from 'immer';
import { BLUR_ACTION, CLOSE_MODAL_ACTION } from './constants';

export const initialState = { Component: 'none', visible: false };

/* eslint-disable default-case, no-param-reassign */
const blurredModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BLUR_ACTION:
        draft.Component = action.payload.Component;
        draft.visible = true;
        draft.props = action.payload.props;

        break;

      case CLOSE_MODAL_ACTION:
        draft.Component = null;
        draft.visible = false;
    }
  });

export default blurredModalReducer;
