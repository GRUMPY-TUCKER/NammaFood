package in.rupam.foodiesapi.service;

import in.rupam.foodiesapi.entity.UserEntity;
import in.rupam.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;


    //we are finding the persons info by email since it is unique
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        return new User(user.getEmail(),user.getPassword(), Collections.emptyList());
    }
}
