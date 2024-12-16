/*
 *
 * Toast actions
 *
 */

import { DEFAULT_ACTION, SHOW_TOAST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showToast(title, position, status) {
  return {
    type: SHOW_TOAST,
    payload: {
      title,
      position,
      status,
    },
  };
}
