import api from '../../components/api/api'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    notiWitD: [],
    loading: false,
    error: '',
}
export const notiWitDAsync = createAsyncThunk('notiWitD', async () => {
    try {
        const notiWitD = await api.get(`api/v1.0/notification/list?typeTranID=2`)
          if (notiWitD.data.status === true ) {
            return notiWitD.data.result
          }
        
    } catch (error) {
        throw error
    }
})


const notiWitDSlice = createSlice({
    name: 'notiWitD',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [notiWitDAsync.pending]: (state, action) => {
            state.loading = true
            state.error = ''
        },
        [notiWitDAsync.fulfilled]: (state, action) =>{
            state.notiWitD = action.payload
            state.loading = false
            state.error = ''
        },
        [notiWitDAsync.rejected]: (state, action) => {
            state.notiWitD = null
            state.loading = false
            state.error = action.error.message
        }
    },
})
export default notiWitDSlice.reducer