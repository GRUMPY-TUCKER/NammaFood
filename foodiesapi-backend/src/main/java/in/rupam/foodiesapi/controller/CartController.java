package in.rupam.foodiesapi.controller;


import in.rupam.foodiesapi.io.CartRequest;
import in.rupam.foodiesapi.io.CartResponse;
import in.rupam.foodiesapi.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cart")
public class CartController {


    private final CartService cartService;

    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request){
        String foodId = request.getFoodId();
        if(foodId==null || foodId.isEmpty()){
            //return ResponseEntity.badRequest().body("Food Id is required");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"FoodId Not Found!");
        }
        return cartService.addToCart(request);
       // return ResponseEntity.ok().body(null);
    }

    //new endpoint
    @GetMapping
    public CartResponse getCart(){
        return cartService.getCart();
    }


    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(){
        cartService.clearCart();
    }

    @PostMapping("/remove")
    public CartResponse removeFromCart(@RequestBody CartRequest request){
        String foodId = request.getFoodId();
        if(foodId==null || foodId.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"FoodId Not Found!");
        }
        return cartService.removeFromCart(request);
    }
}
