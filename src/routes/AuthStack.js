// AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Otp, Splash } from '../screens';

const AuthStack = createNativeStackNavigator();

export default function AuthStackScreen() {
  console.log("first")
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Splash"
        component={Splash}
        options={{ title: 'Welcome' }}
      />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Otp" component={Otp} />
    </AuthStack.Navigator>
  );
}
