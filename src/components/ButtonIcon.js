import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FONT } from '../utils/font';

const ButtonIcon = () => {
  return (
    <TouchableOpacity
      style={styles.button}
    //   onPress={onPress}
    >
      <Icon name="add-location-alt" size={20} color="#4F8EF7" />
      <Text style={{color:"#4F8EF7",fontFamily:FONT.REG_POP}}>Noida</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // borderColor:"red",
    // backgroundColor: '#4F8EF7',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 50, // Adjust this for circular buttons
  },
});

export default ButtonIcon;
