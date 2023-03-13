import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "./slices/actionSlice";
import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import notiDepoSlice from "./slices/notiDepoSlice";
import notiWitDSlice from "./slices/notiWitDSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        action: actionSlice,
        notiDepo: notiDepoSlice,
        notiWitD: notiWitDSlice,
    }
})