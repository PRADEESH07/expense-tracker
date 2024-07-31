import React from 'react'
import userToken from '../../utils/getToken'
import AlertMessage from '../AlertMessage'
import { Navigate } from 'react-router-dom'
const AuthRoute = ({children}) => {
    if(userToken)
    {
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default AuthRoute
