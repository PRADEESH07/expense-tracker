import React from 'react'
import userToken from '../../utils/getToken'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const AuthRoute = ({children}) => {
      const user=useSelector((state)=>state?.auth?.user)
    if(user)
    {
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default AuthRoute
