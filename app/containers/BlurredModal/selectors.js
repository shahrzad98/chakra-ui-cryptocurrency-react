import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blurredModal state domain
 */

const selectBlurredModalDomain = state => state.blurredModal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlurredModal
 */

const makeSelectBlurredModal = () =>
  createSelector(selectBlurredModalDomain, substate => substate);

export default makeSelectBlurredModal;
export { selectBlurredModalDomain };
