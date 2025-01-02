import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../utils/color';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {FONT} from '../../utils/font';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import axiosInstance from '../../utils/baseUrl';

const Login = ({navigation}) => {
  const [tabsValue, setTabValue] = useState('number');
  const [number, setNumber] = useState('');
  const ref = useRef();
  const toast = useToast();

  const handlerSendOTP = async () => {
    if (Object.keys(number).length < 10 || Object.keys(number).length >= 11) {
      toast.show('Please enter a valid number', {
        type: '',
        offset: 200,
        animationType: 'zoom-in',
      });
    } else {
      try {
        const {data} = await axiosInstance.post('/partner_api/get_otp', {
          mobile: number,
          c_code: '91',
        });
        toast.show('Otp send', {
          type: '',
          offset: 100,
          animationType: 'zoom-in',
        });
        console.log(data)
        navigation.navigate('Otp',{dataa:number});
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/login_logo.png')}
        style={styles.imageStyle}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.loginBtnWrapper,
            {backgroundColor: tabsValue === 'number' ? 'white' : COLORS.GREY},
          ]}
          onPress={() => setTabValue('number')}>
          <Text
            style={[
              styles.loginBtnNumber,
              {color: tabsValue === 'number' ? COLORS.BLUE : 'black'},
            ]}>
            Number
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginBtnWrapper,
            {backgroundColor: tabsValue === 'email' ? 'white' : COLORS.GREY},
          ]}
          onPress={() => setTabValue('email')}>
          <Text
            style={[
              styles.loginBtnNumber,
              {color: tabsValue === 'email' ? COLORS.BLUE : 'black'},
            ]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>

      {tabsValue === 'number' ? (
        <>
          <View style={{width: '87%', marginTop: verticalScale(50)}}>
            <Text style={{color: COLORS.BLACK, fontSize: scale(14)}}>
              Mobile
            </Text>
          </View>

          <View style={styles.input}>
            <TextInput
              ref={ref}
              keyboardType="numeric"
              placeholder="Enter number"
              style={{color: COLORS.BLACK}}
              value={number}
              onChangeText={setNumber}
            />
          </View>

          <TouchableOpacity
            style={styles.btnStyle}
            // onPress={() => navigation.navigate('Otp')}
            onPress={handlerSendOTP}>
            <Text
              style={{
                fontFamily: FONT.BOLD_MONT,
                fontWeight: '700',
                fontSize: 18,
              }}>
              Send Otp
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={{width: '87%', marginTop: verticalScale(50)}}>
            <Text style={{color: COLORS.BLACK, fontSize: scale(14)}}>
              Email
            </Text>
          </View>

          <View style={styles.input}>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter email"
              style={{color: COLORS.BLACK}}
            />
          </View>

          <TouchableOpacity
            style={styles.btnStyle}
            // onPress={() => navigation.navigate('Otp')}
          >
            <Text
              style={{
                fontFamily: FONT.BOLD_MONT,
                fontWeight: '700',
                fontSize: 18,
              }}>
              Send Otp
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    borderWidth: 2,
    borderColor: COLORS.GREY,
    width: '90%',
    height: verticalScale(40),
    borderRadius: scale(100),
    backgroundColor: COLORS.GREY,
  },
  loginBtnWrapper: {
    borderRadius: scale(98),
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    // backgroundColor:'pink',
  },
  loginBtnNumber: {
    fontFamily: FONT.REG_MONT,
    fontSize: scale(14),
  },
  // loginBtnEmail: {
  //   fontFamily: FONT.REG_MONT,
  //   fontSize: scale(14),
  //   color: 'black',
  // },
  imageStyle: {
    width: scale(90),
    height: verticalScale(90),
    marginTop: verticalScale(30),
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.GREY,
    borderRadius: 5,
    width: '88%',
    color: COLORS.BLACK,
    marginTop: verticalScale(10),
    paddingHorizontal: scale(5),
    backgroundColor: COLORS.GREY,
    height: verticalScale(40),
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

{
  /* {tabsValue === 'number' ? (
          <Text style={{color: COLORS.BLUE}}>Number</Text>
        ) : (
          <Text style={{color: COLORS.BLUE}}>Email</Text>
        )} */
}
