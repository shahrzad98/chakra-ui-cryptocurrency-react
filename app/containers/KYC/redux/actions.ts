import ActionTypes from './constants';

export function setPersonalInfo(personalInfo) {
  return {
    type: ActionTypes.PERSONAL_INFO,
    payload: {
      personalInfo
    },
  };
}

export function setDocumentInfo(documentInfo) {
  return {
    type: ActionTypes.DOCUMENT,
    payload: {
      documentInfo
    },
  };
}

export function setImagePreview(imagePreview) {
  return {
    type: ActionTypes.IMAGE_PREVIEW,
    payload: {
      imagePreview
    },
  };
}


export function setCurrentSampleSlie(currentSlide) {
  return {
    type: ActionTypes.CURRENT_SLIDE,
    payload: {
      currentSlide
    },
  };
}

export function setBankCards(bankCards) {
  return {
    type: ActionTypes.BANK_CARDS,
    payload: {
      bankCards
    }
  }
}

export function setEditingBaseInfo(editingBaseInfo) {
  return {
    type: ActionTypes.EDITING_BASE_INFO,
    payload: {
      editingBaseInfo
    }
  }
}
