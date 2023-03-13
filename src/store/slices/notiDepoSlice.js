import api from '../../components/api/api'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    notiDepo: [],
    loading: false,
    error: '',
}
export const notiDepoAsync = createAsyncThunk('notiDepo', async () => {
    try {
        const notiDepo = await api.get(`api/v1.0/notification/list?typeTranID=1`)
          if (notiDepo.data.status === true ) {
            return notiDepo.data.result
          }
        
    } catch (error) {
        throw error
    }
})


const notiDepoSlice = createSlice({
    name: 'notiDepo',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [notiDepoAsync.pending]: (state, action) => {
            state.loading = true
            state.error = ''
        },
        [notiDepoAsync.fulfilled]: (state, action) =>{
            state.notiDepo = action.payload
            state.loading = false
            state.error = ''
        },
        [notiDepoAsync.rejected]: (state, action) => {
            state.notiDepo = null
            state.loading = false
            state.error = action.error.message
        }
    },
})
export default notiDepoSlice.reducer