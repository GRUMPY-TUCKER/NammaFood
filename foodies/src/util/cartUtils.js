export const calculateCartTotals = (cartItems, quantities, discount = 0) => {
    const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
    const shipping = subtotal === 0 ? 0.0 : 10.0; // Flat shipping rate
    const tax = subtotal === 0 ? 0.0 : subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax - discount; // Apply discount

    return {
        subtotal,
        shipping,
        tax,
        total
    };
};