import React from 'react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import createImmerPlugin from '@rematch/immer';
import createLoadingPlugin from '@rematch/loading';

import models from './models';
import App from './App';

const store = init({
  models,
  plugins: [
    createImmerPlugin(),
    createLoadingPlugin({}),
  ]
});

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
