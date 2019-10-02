import * as React from 'react';
import { Provider } from './models';
import { App } from './App';

export const Root: React.FC = () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
