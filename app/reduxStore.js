import React from 'react';
import configureStore from './configureStore';
import history from 'utils/history';

export class ReduxStore {
  constructor() {
    ReduxStore.instance = this;
  }

  static getInstance() {
    if (!ReduxStore.instance) {
      ReduxStore.instance = new ReduxStore();
      ReduxStore.store = configureStore({}, history);
    }
    return ReduxStore.instance;
  }

  get() {
    return ReduxStore.store;
  }
}
