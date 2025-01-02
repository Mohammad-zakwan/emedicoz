import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const handlerSubmitLogin = createAsyncThunk(
  'auth/loginuser',
  async ({dataa, otp}, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(
        'https://d85g0bvcnm0si.cloudfront.net/partner_api/otp_verify',
        {
          mobile: dataa,
          otp: otp,
        },
      );
      if (data.status === true) {
        return data.data;
      } else {
        ToastAndroid.showWithGravityAndOffset(
          data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          2,
          5,
        );
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  },
);

const LoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      (state.user = null), (state.token = null);
      ToastAndroid.showWithGravityAndOffset(
        'Logout',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        2,
        5,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handlerSubmitLogin.pending, state => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(handlerSubmitLogin.fulfilled, (state, action) => {
        // console.log("->",action.payload)
        (state.isLoading = false),
          (state.user = action.payload),
          (state.token = action.payload.Authorization);
      })
      .addCase(handlerSubmitLogin.rejected, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = LoginSlice.actions;
export default LoginSlice.reducer;
