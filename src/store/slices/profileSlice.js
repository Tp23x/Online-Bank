import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import configData from '../../config.json'
import api from '../../components/api/api'
// const api_url = configData.REACT_APP_BASE_API
// let api_url = window.REACT_APP_BASE_API || process.env.REACT_APP_BASE_API

const initialState = {
    profile: null,
    loading: false,
    error: '',
}
export const profileAsync = createAsyncThunk('profile', async () => {
    try {
        const profile = await api.get(`api/v1.0/auth/profile`)
          if (profile.data.code === 1006 ) {
              const firstname = profile.data.result.firstname
              const role = profile.data.result.role.roleName
              const userId = profile.data.result.userID
            localStorage.setItem("profile", JSON.stringify({profile: {firstname, role, userId}}));
            return profile.data.result
          }
        
         
    } catch (error) {
        throw error
    }
})


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [profileAsync.pending]: (state, action) => {
            state.loading = true
            state.error = ''
        },
        [profileAsync.fulfilled]: (state, action) =>{
            state.profile = action.payload
            state.loading = false
            state.error = ''
        },
        [profileAsync.rejected]: (state, action) => {
            state.profile = null
            state.loading = false
            state.error = action.error.message
        }
    },
})
export default profileSlice.reducer