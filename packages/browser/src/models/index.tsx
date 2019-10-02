import * as React from 'react';
import { session, SessionModel } from './session.model';
import { useLocalStore } from 'mobx-react';

interface Store {
  session: SessionModel;
}

export const createStore = (): Store => ({
  session,
});

export const storeContext = React.createContext<Store>(null);

export const Provider = ({ children }) => {
  const store = useLocalStore(createStore);
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = (name: keyof Store) => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store[name];
};
