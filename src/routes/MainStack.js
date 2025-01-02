import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main, Splash} from '../screens';
import {Image, Text, TouchableOpacity} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonIcon from '../components/ButtonIcon';
import {FONT} from '../utils/font';
import {useDispatch, useSelector} from 'react-redux';
import axiosInstance from '../utils/baseUrl';
import { checkDashboard } from '../redux/UserSlice';

const MainStack = createNativeStackNavigator();

export default function MainStackScreen() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // console.log("----->",user)

  // const getDashboardCalled = async()=>{
  //   try {
  //     const {data} =await axiosInstance.post("/partner_api/franchise_dashboard_icon_v1",{
  //       learning_center_detail_id: user?.partner_type,
  //       mobile: user?.mobile,
  //     })
  //     if(data.status === true){
  //       console.log("->line",data?.data?.owner_name)
  //       setAllData(data.data)
  //     }else{
  //       setAllData({})
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    if (user?.Authorization) {
      // console.log(user?.partner_type,user?.mobile)
      dispatch(checkDashboard(user));
    }
  }, [user]);

  // console.log("MainStack->",user)
  return (
    <MainStack.Navigator
      screenOptions={{
        // headerTransparent: true,
        // headerTitle: 'Nagvender',
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft: moderateScale(10)}}>
            <Image
              source={require('../assets/images/login_logo.png')}
              style={{
                width: moderateScale(30),
                height: verticalScale(25),
                borderRadius: moderateScale(10),
              }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => <ButtonIcon />,
      }}>
      {/* <MainStack.Screen
        name="Splash"
        component={Splash}
        options={{title: 'Welcome'}}
      /> */}
      <MainStack.Screen
        name="Nagvender Singh"
        component={Main}
        options={{
          // title: user?.member_d,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 14, fontFamily: FONT.BOLD_POP},
        }}
      />
    </MainStack.Navigator>
  );
}
