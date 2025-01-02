import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/baseUrl";
// const user = JSON.parse(localStorage.getItem("userInfo"));



const initialState = {
  waiting: false,
  dashboard: {},
};


export const checkDashboard = createAsyncThunk("user/dash", async (user) => {
    console.log("ANUJ->",user)
  try {
    const { data } = await axiosInstance.post(
      "/partner_api/franchise_dashboard_icon_v1",
      {
        learning_center_detail_id: user?.partner_type,
        mobile: user?.mobile,
      }
    );
    console.log(data)

    // return data?.data;
    // if(data.status === true){

    // }else{
    //   toast.error(data.message)
    // }
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload;
      },
      clearUserToken: (state) => {
        state.dashboard = {};
        localStorage.clear();
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkDashboard.pending, (state) => {
        state.waiting = true;
      })
      .addCase(checkDashboard.fulfilled, (state, action) => {
        console.log(action.payload)
        state.dashboard = action.payload;
        localStorage.setItem("dashboard", JSON.stringify(action.payload));
        state.waiting = false;
      })
      .addCase(checkDashboard.rejected, (state) => {
        state.waiting = false;
      });
  },
});

export const { setToken, clearUserToken } = userSlice.actions;
export default userSlice.reducer;
