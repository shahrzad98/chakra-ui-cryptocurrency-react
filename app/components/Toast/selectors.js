import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toast state domain
 */

const selectToastDomain = state => state.toast || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Toast
 */

const makeSelectToast = () =>
  createSelector(selectToastDomain, substate => substate);

export default makeSelectToast;
export { selectToastDomain };
