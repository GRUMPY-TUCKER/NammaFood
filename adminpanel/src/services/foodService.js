import axios from "axios";
import { API_BASE_URI } from "../util/constants";

const API_URL = `${API_BASE_URI}/api/foods`;

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image);
    try{
    await axios.post(API_URL, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }catch (error) {
        console.error("Error adding food:", error);
        throw error;
    }
}

export const getFoodList = async () => {
    try{
    const response = await axios.get(API_URL);
    return response.data;
    }catch (error) {
        console.error("Error while fetching the food list:", error);
        throw error;
    } 
}

export const deleteFood = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.status===204;
    }catch(error){
        console.error("Error while deleting the less important food:", error);
        throw error;
    }
}