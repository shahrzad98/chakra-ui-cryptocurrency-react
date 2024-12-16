/*
 *
 * BlurredModal actions
 *
 */
import React from 'react';
import { BLUR_ACTION, CLOSE_MODAL_ACTION, NO_BLUR_ACTION } from './constants';

export function setBlur(Component, props = {}) {
  return {
    type: BLUR_ACTION,
    payload: {
      Component,
      props,
    },
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL_ACTION,
    payload: {
      component: null,
      visible: false,
    },
  };
}
