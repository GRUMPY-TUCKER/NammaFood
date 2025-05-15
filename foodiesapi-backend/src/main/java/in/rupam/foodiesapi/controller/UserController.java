package in.rupam.foodiesapi.controller;


import in.rupam.foodiesapi.io.UserRequest;
import in.rupam.foodiesapi.io.UserResponse;
import in.rupam.foodiesapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {


    private final UserService userService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
//        UserResponse response = userService.registerUser(request);
//        return response;
        return userService.registerUser(request);
    }
}
