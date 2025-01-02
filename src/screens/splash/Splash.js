import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const Splash = ({navigation}) => {
  const { user} = useSelector((state) => state?.auth);
  useEffect(() => {
    setTimeout(() => {
      user?.Authorization ? 
      navigation.navigate('Main') : navigation.navigate('Login')
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>Splash</Text> */}
      <Animatable.Image source={require('../../assets/images/login_logo.png')} />
      <Animatable.Text style={styles.part} duration={1000} animation="zoomIn" >Welcome to partner</Animatable.Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  part: {
    color: 'black',
    fontSize: scale(20),
    fontFamily:"Poppins-Regular"
  },
});
