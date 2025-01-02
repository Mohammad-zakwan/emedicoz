import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {handlerSubmitLogin} from '../../redux/LoginSlice';

const Otp = ({route, navigation}) => {
  const {dataa} = route.params;
  // console.log(dataa)
  const refOne = useRef();
  const refTwo = useRef();
  const refThree = useRef();
  const refFour = useRef();

  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');
  const [inputFour, setInputFour] = useState('');
  const [count, setCount] = useState(60);

  const dispatch = useDispatch();

  const handlerSubmit =  () => {
    const otp = [inputOne,inputTwo,inputThree,inputFour].join('');
    dispatch(handlerSubmitLogin({dataa, otp}));
  };

  useEffect(() => {
    const intervel = setInterval(() => {
      if (count == 0) {
        clearInterval(intervel);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervel);
    };
  }, [count]);

  useEffect(() => {
    if (!inputOne) {
      refOne.current.focus();
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <View style={styles.img}>
        <Image
          style={{width: scale(90), height: verticalScale(90)}}
          source={require('../../assets/images/otp.png')}
        />
      </View>
      <View style={styles.otpView}>
        <TextInput
          ref={refOne}
          style={[
            styles.inputView,
            {borderColor: inputOne.length >= 1 ? 'green' : '#000'},
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={inputOne}
          onChangeText={txt => {
            setInputOne(txt);
            if (txt.length >= 1) {
              refTwo.current.focus();
            } else if (txt.length == 0) {
              setInputOne('');
            }
          }}
        />
        <TextInput
          ref={refTwo}
          style={[
            styles.inputView,
            {borderColor: inputTwo.length >= 1 ? 'green' : '#000'},
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={inputTwo}
          onChangeText={txt => {
            if (txt.length >= 1) {
              setInputTwo(txt);
              refThree.current.focus();
            } else if (txt.length <= 1) {
              setInputTwo('');
              refOne.current.focus();
            }
          }}
        />
        <TextInput
          ref={refThree}
          style={[
            styles.inputView,
            {borderColor: inputThree.length >= 1 ? 'green' : '#000'},
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={inputThree}
          onChangeText={txt => {
            if (txt.length >= 1) {
              setInputThree(txt);
              refFour.current.focus();
            } else if (txt.length < 1) {
              setInputThree('');
              refTwo.current.focus();
            }
          }}
        />
        <TextInput
          ref={refFour}
          style={[
            styles.inputView,
            {borderColor: inputFour.length >= 1 ? 'green' : '#000'},
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={inputFour}
          onChangeText={txt => {
            if (txt.length >= 1) {
              setInputFour(txt);
              refFour.current.focus();
            } else if (txt.length < 1) {
              setInputFour('');
              refThree.current.focus();
            }
          }}
        />
      </View>
      <View style={styles.resendView}>
        <Text
          style={[
            styles.titleCount,
            {fontWeight: 700, color: count === 0 ? 'blue' : 'grey'},
          ]}
          onPress={() => setCount(60)}>
          Reset
        </Text>
        {count !== 0 && (
          <Text style={[styles.titleCount, {marginLeft: scale(5)}]}>
            {count + ' seconds'}
          </Text>
        )}
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('Home')}
        onPress={handlerSubmit}
        disabled={
          !inputOne || !inputTwo || !inputThree || !inputFour ? true : false
        }
        style={[
          styles.verifyOtp,
          {
            backgroundColor:
              !inputOne || !inputTwo || !inputThree || !inputFour
                ? 'grey'
                : 'dodgerblue',
          },
        ]}>
        <Text style={styles.btnTxt}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: 'black',
  },
  title: {
    fontSize: scale(18),
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: verticalScale(30),
  },
  img: {
    alignSelf: 'center',
  },
  otpView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(50),
  },
  inputView: {
    width: scale(40),
    height: verticalScale(40),
    borderWidth: 0.8,
    borderRadius: 5,
    marginLeft: scale(10),
    color: 'black',
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '700',
  },
  verifyOtp: {
    width: '80%',
    height: verticalScale(45),
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: scale(14),
  },
  resendView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
  },
  titleCount: {
    color: 'black',
    fontSize: scale(14),
  },
});
