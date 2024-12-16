import { initialState } from './reducer';

export const kycSelector = state => state.kyc || initialState;

