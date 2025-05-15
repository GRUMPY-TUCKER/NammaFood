package in.rupam.foodiesapi.service;

import in.rupam.foodiesapi.io.CartRequest;
import in.rupam.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);

}
