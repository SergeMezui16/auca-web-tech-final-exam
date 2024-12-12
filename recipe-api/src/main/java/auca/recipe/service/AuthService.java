package auca.recipe.service;

import auca.recipe.entity.User;
import auca.recipe.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {


    private final UserRepository repository;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository repository, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
    }

    public boolean authenticate(String email, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password)).isAuthenticated();
    }

    public User getLoggedUser() throws Exception {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = this.repository.findByEmail(email);

        if (user.isEmpty()) throw new Exception("User is not found, you must login first!");

        return user.get();
    }
}
