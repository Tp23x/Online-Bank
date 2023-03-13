import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../components/api/api";
import LoadingAdapter from "../../libs/utils/LoadingAdapter";

let initialState = { list: [] };

export const getActions = createAsyncThunk(
  "action/getActions", // ตัวแรก ต้องตรวกับ name
  async () => {
      const roleRes = await api.get("api/v1.0/setting/configaction/list/bytoken");
      const _roleList = roleRes.data.result;
      return _roleList;
    }
  
);

const actionSlice = createSlice({
  name: "action",
  initialState: initialState,
  reducers: {
    // ไม้ต่อ api
  },
  extraReducers: (builder) => {
    // ต่อ api
    LoadingAdapter.applyAsyncBuilder(getActions, builder, ["list"]);
  },
});

export default actionSlice.reducer;
