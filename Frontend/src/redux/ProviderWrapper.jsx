'use client';

import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';

export function ProviderWrapper({ children }) {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
