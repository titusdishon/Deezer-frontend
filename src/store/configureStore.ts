import { Action, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage/session';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';

const RootStore = () => {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['music'],
    transforms: [
      encryptTransform({
        secretKey: `deezer`,
        onError: (err: any) => {
          // eslint-disable-next-line no-console
          console.log('ENC_ERR', err);
        },
      }),
    ],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({ reducer: persistedReducer });
  const persistor = persistStore(store);
  return { store, persistor };
};
const { store } = RootStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default RootStore;
