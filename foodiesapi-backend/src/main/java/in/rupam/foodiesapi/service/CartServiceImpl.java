package in.rupam.foodiesapi.service;


import in.rupam.foodiesapi.entity.CartEntity;
import in.rupam.foodiesapi.io.CartRequest;
import in.rupam.foodiesapi.io.CartResponse;
import in.rupam.foodiesapi.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{


    private final CartRepository cartRepository;
    private final UserService userService;
    @Override
    public CartResponse addToCart(CartRequest request){
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(()-> new CartEntity(loggedInUserId, new HashMap<>()));
        Map<String,Integer> cartItems = cart.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);
        cart.setItems(cartItems);
        cart = cartRepository.save(cart);
        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(null, loggedInUserId, new HashMap<>()));
        return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }


    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not present!"));
        Map<String, Integer> cartItems =  entity.getItems();
        if(cartItems.containsKey(cartRequest.getFoodId())){
            int currentQuantity = cartItems.get(cartRequest.getFoodId());
            if(currentQuantity>0){
                cartItems.put(cartRequest.getFoodId(), currentQuantity - 1);
            } else {
                cartItems.remove(cartRequest.getFoodId());
            }
            entity = cartRepository.save(entity);
        }
        return convertToResponse(entity);
    }

    private CartResponse convertToResponse(CartEntity cartEntity){
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }
}
