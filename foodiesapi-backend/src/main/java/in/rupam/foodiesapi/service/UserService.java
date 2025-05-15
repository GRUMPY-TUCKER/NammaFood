package in.rupam.foodiesapi.service;

import in.rupam.foodiesapi.io.UserRequest;
import in.rupam.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
