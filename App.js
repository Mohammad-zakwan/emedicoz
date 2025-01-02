import {StatusBar} from 'react-native';
import {COLORS} from './src/utils/color';
import {Provider, useSelector} from 'react-redux';
import Store, {persistor} from './src/redux/Store';
import SwitchScreen from './src/routes/SwitchScreen';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

// let persistedStore = persistStore(Store);
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <SwitchScreen />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
