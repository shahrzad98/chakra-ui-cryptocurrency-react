import produce from 'immer';
import {BankCard, PersonalInfo } from '../types';

type initialStateType = {
  personalInfo: PersonalInfo | null,
  documentInfo: string | null,
  imagePreview: string | null,
  currentSlide: number,
  bankCards: BankCard[] | null,
  editingBaseInfo: boolean
}
export const initialState:initialStateType = {personalInfo: null , documentInfo: null, imagePreview: null, currentSlide: 1 , bankCards: null, editingBaseInfo: false};

const kycProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'PERSONAL_INFO':
        draft.personalInfo = action.payload.personalInfo;
        break;
      case 'DOCUMENT':
        draft.documentInfo = action.payload.documentInfo;
        break;
      case 'IMAGE_PREVIEW':
        draft.imagePreview = action.payload.imagePreview;
        break;
      case 'CURRENT_SLIDE':
        draft.currentSlide = action.payload.currentSlide;
        break;
      case 'BANK_CARDS':
        draft.bankCards = action.payload.bankCards;
        break;
      case 'EDITING_BASE_INFO':
        draft.editingBaseInfo = action.payload.editingBaseInfo;
        break;
    }
  });

export default kycProviderReducer;
