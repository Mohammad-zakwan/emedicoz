import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import LoginSlice from './LoginSlice';
import UserSlice from './UserSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedRed = persistReducer(persistConfig, LoginSlice);

export default Store = configureStore({
  reducer: {
    auth: persistedRed,
    user: UserSlice,
  },
});
export const persistor = persistStore(Store);
