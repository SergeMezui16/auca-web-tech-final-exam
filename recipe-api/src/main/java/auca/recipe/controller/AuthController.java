package auca.recipe.controller;

import auca.recipe.dto.CreateUserDto;
import auca.recipe.dto.LoginDto;
import auca.recipe.service.AuthService;
import auca.recipe.service.UserService;
import auca.recipe.utils.AbstractApiController;
import auca.recipe.utils.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController extends AbstractApiController {

    private final static String TOKEN_COOKIE_NAME = "token";

    private final UserService service;
    private final JWTUtil jwtUtil;
    private final AuthService authService;

    public AuthController(UserService service, JWTUtil jwtUtil, AuthenticationManager authenticationManager, AuthService authService) {
        this.service = service;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody CreateUserDto dto) {
        return this.send(this.service.create(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto, HttpServletResponse response) {
        Map<String, Object> authData = new HashMap<>();
        try {
            boolean isAuthenticated = this.authService.authenticate(dto.getEmail(), dto.getPassword());

            if (isAuthenticated) {
                String token = jwtUtil.generateToken(dto.getEmail());
                authData.put("token", token);
                authData.put("exp", jwtUtil.extractExpirationDate(token));

                Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, token);
                cookie.setHttpOnly(false);
                cookie.setSecure(true);
                cookie.setDomain(null);
                cookie.setAttribute("SameSite", "none");
                cookie.setPath("/");
                cookie.setMaxAge(60 * 60 * 24 * 30);
                response.addCookie(cookie);

                authData.put("type", "Bearer ");
                return send(authData);
            }
            authData.put("email", "Email or password is incorrect");
            return this.throwUnprocessableEntity(authData);

        } catch (Exception ex) {
            authData.put("email", "Email or password is incorrect");
            return this.throwUnprocessableEntity(authData);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setDomain(null);
        cookie.setAttribute("SameSite", "none");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return send(cookie);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() throws Exception {
        return this.send(this.authService.getLoggedUser());
    }
}
