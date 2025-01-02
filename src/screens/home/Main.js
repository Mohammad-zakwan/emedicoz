import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/color';
import {verticalScale} from 'react-native-size-matters';
import {FONT} from '../../utils/font';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/LoginSlice';

const Main = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
  // console.log("->",user?.partner_type)
  const handlerLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnStyle} onPress={handlerLogout}>
        <Text
          style={{
            fontFamily: FONT.BOLD_MONT,
            fontWeight: '700',
            fontSize: 18,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  part: {
    color: 'black',
    fontSize: 20,
    // fontFamily:"montserrat"
  },
  btnStyle: {
    backgroundColor: COLORS.BLUE,
    width: '88%',
    height: verticalScale(35),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
    // fontSize:scale(16)
  },
});
