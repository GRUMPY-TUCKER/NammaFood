import axios from "axios";
import {API_BASE_URI} from "../util/constants";

const API_URL = `${API_BASE_URI}/api`; // Replace with your API endpoint

export const registeredUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}