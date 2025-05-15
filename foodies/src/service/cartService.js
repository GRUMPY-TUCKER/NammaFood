import axios from "axios";
import {API_BASE_URI} from "../util/constants";

const API_URL = `${API_BASE_URI}/api/cart`;

export const addToCart = async (foodId, token) => {
    try {
        const response = await axios.post(API_URL, {foodId}, {headers: { "Authorization": `Bearer ${token}` }} );
        return response; // Return the response from the API call
    }catch (error) {
        console.error("Error adding to cart:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const removeQtyFromCart = async (foodId, token) => {
    try {
        const response = axios.post(`${API_URL}/remove`, {foodId}, {headers: { "Authorization": `Bearer ${token}` }} );
        return response; // Return the response from the API call
    }catch (error) {
        console.error("Error adding to cart:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const getCartData = async (token) => {
    try {
        const response =  await axios.get(API_URL, {headers: { "Authorization": `Bearer ${token}` }});
        return response.data.items; // Return the response from the API call
    }catch (error) {
        console.error("Error adding to cart:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};