import axios from 'axios';
import {API_BASE_URI} from "../util/constants";

const API_URL = `${API_BASE_URI}/api/foods`; // Replace with your API endpoint

export const fetchFoodList = async () => {
        try{
            const response = await axios.get(API_URL);
            return response.data; // Assuming the API returns the food list in the response body
        }catch(error){
            console.error('Error while fetching food list:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    };
    
export const fetchFoodDetais = async (id) => {
        try{
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data; // Assuming the API returns the food details in the response body
        }catch(error){
            console.error('Error while fetching food details:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    };