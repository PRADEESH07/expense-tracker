import axios from "axios"
import { BASE_URL } from "../../utils/url"
import userToken from "../../utils/getToken"
//!Login
export const loginApi=async({email,password})=>{
    const response = await axios.post(`${BASE_URL}/user/login`,{
        email,
        password
    })
    // console.log(response);
    //return promise
    return response.data
}
export const registerApi=async({email,password,username})=>{
    const response = await axios.post(`${BASE_URL}/user/register`,{
        username,
        email,
        password
    })
    // console.log(response);
    //return promise
    return response.data
}
export const changePasswordApi=async(newPassword)=>{
    const response = await axios.put(`${BASE_URL}/user/changePassword`,{
        newPassword
    },{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const updateProfileApi=async({email,username})=>{
    const response = await axios.put(`${BASE_URL}/user/updateProfile`,{
        username,
        email,
    },{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}