import axios from "axios"
import { BASE_URL } from "../../utils/url"
import userToken from "../../utils/getToken"
//!Login
export const addTransactionApi=async({type,amount,category,date,description})=>{
    const response = await axios.post(`${BASE_URL}/transaction/create`,{
        type,
        amount,
        category,
        date,
        description
    },{
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const listTransactionApi=async({startDate,endDate,category,type})=>{
    const response = await axios.get(`${BASE_URL}/transaction/list`,{
        params: {
            category,type,startDate,endDate
        },
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const updateTransactionApi=async({type,amount,category,date,description,id})=>{
    const response = await axios.put(`${BASE_URL}/transaction/update/${id}`,
        {
            type,
            amount,
            category,
            date,
            description
    },{
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const deleteTransactionApi=async(id)=>{
    const response = await axios.delete(`${BASE_URL}/transaction/delete/${id}`,
        {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}