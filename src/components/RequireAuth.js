import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
const RequireAuth = () => {
    const location = useLocation()
    // console.log({location})
    const local_token = localStorage.getItem("accessToken")
    // const { user } = useSelector(state => state.auth)
    
    return (
        local_token
            ? <Outlet/>
            : <Navigate to="/Login" replace />
    )
}


export default RequireAuth