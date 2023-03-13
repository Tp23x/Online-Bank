import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import configData from '../../config.json'
import api from '../../components/api/api'

// const api_url = configData.REACT_APP_BASE_API
// let api_url = window.REACT_APP_BASE_API || process.env.REACT_APP_BASE_API
const initialState = {
    user: null,
    loading: false,
    error: '',
}

export const loginAsync = createAsyncThunk('login', async ({ username, password }, store) => {
    try {
        const user = await api.post(`api/v1.0/auth/login`, {
            username,
            password,
          }) 
          if (user.data.code === 1000 ) {
            console.log('login ss')
            localStorage.setItem("accessToken", user.data.result.accessToken);
            window.location.href ='/'
          }else {
            console.log('login failed')
        }
         return user.data
         
    } catch (error) {
        throw error
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null
            state.loading = false
            state.error = ''
        }
    },
    extraReducers: {
        [loginAsync.pending]: (state, action) => {
            state.loading = true
            state.error = ''
        },
        [loginAsync.fulfilled]: (state, action) =>{
            state.user = action.payload
            state.loading = false
            state.error = ''
        },
        [loginAsync.rejected]: (state, action) => {
            state.user = null
            state.loading = false
            state.error = action.error.message
        }
    },
})
export const {logout} = authSlice.actions
export default authSlice.reducer