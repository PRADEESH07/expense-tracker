import axios from "axios"
import { BASE_URL } from "../../utils/url"
import userToken from "../../utils/getToken"
//!Login
export const addCategoryApi=async({name,type})=>{
    const response = await axios.post(`${BASE_URL}/categories/create`,{
        name,
        type
    },{
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const listCategoriesApi=async()=>{
    const response = await axios.get(`${BASE_URL}/categories/list`,{
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const updateCategoriesApi=async({id,name,type})=>{
    const response = await axios.put(`${BASE_URL}/categories/update/${id}`,
        {
        name,
        type
    },{
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}
export const deleteCategoriesApi=async(id)=>{
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`,
        {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    // console.log(response);
    //return promise
    return response.data
}