import React from 'react';
import { createContext,useState,useEffect} from 'react';
import { fetchFoodList } from '../service/foodService';
import { addToCart } from '../service/cartService';
import { removeQtyFromCart } from '../service/cartService';
import { getCartData } from '../service/cartService';

export const StoreContext = createContext(null);


export const StoreContextProvider = ({ children }) => {
    //Now I need to give a call to the backend API service to get the data and then set it in the state.
    //Store the response from the API call
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({
        // Initialize quantities for each food item
        // Assuming foodList has an id property for each item
        // This will be updated once foodList is fetched
        
    });
    const [token,setToken] = useState(""); // Initialize token state
    // Function to update the quantity of a food item
    const increaseQty = async (foodId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [foodId]: (prevQuantities[foodId] || 0) + 1, // Increment the quantity for the food item
        }));
        await addToCart(foodId,token);
    }

    // Function to decrease the quantity of a food item
    const decreaseQty = async (foodId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [foodId]: prevQuantities[foodId] > 0 ? prevQuantities[foodId] - 1 : 0 // Decrement the quantity for the food item, ensuring it doesn't go below 0
        }));
        await removeQtyFromCart(foodId,token); // Call the API to remove the item from the cart
    }

    const removeFromCart = (foodId) => {
        setQuantities((prevQuantities) => {
            const updateQuantities = { ...prevQuantities };
            delete updateQuantities[foodId]; // Remove the food item from the quantities state
            return updateQuantities;
        });
    }

    const loadCartData = async (token) => {
        try {
            const items = await getCartData(token); // Call the API to get the cart data
            setQuantities(items); // Set the fetched cart data in the quantities state
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        }
    }
    
    const contextValue = {
        foodList,
        quantities,
        setQuantities,
        increaseQty,
        decreaseQty,
        removeFromCart,
        token,
        setToken, // Provide the setToken function to update the token state
        loadCartData // Provide the loadCartData function to load cart data
    }
    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchFoodList();
                setFoodList(data); // Set the fetched data in the state
                //On reloading the user doesnot gets logged out, so we need to check if the token is already present in local storage and set it in the state.
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token")); // Set the token from local storage if available
                    await loadCartData(localStorage.getItem("token")); // Load cart data using the token
                }
            } catch (error) {
                console.error('Failed to fetch food list:', error);
            }
        }
        loadData();
    }, []);
    return (
        <StoreContext.Provider value={contextValue}>
        {children}
        </StoreContext.Provider>
    );
}