import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import AuthStackScreen from './AuthStack';
import MainStackScreen from './MainStack';
import {useSelector} from 'react-redux';

const SwitchScreen = () => {
  const {user} = useSelector(state => state?.auth);
  // console.log(user)
  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} /> */}

      <ToastProvider
        placement="top"
        duration={1000}
        successColor="green"
        dangerColor="red">
        <NavigationContainer>
          {user?.Authorization ? <MainStackScreen /> : <AuthStackScreen />}
        </NavigationContainer>
      </ToastProvider>
    </>
  );
};

export default SwitchScreen;
