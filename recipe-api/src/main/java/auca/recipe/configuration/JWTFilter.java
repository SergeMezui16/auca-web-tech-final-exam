package auca.recipe.configuration;

import auca.recipe.service.UserDetailService;
import auca.recipe.utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final UserDetailService userDetailService;
    private final JWTUtil jwtUtil;

    private final String[] excludedPaths = {"/auth/login", "/auth/register", "/reset_password", "/reset_password_request"};

    public JWTFilter(UserDetailService userDetailService, JWTUtil jwtUtil) {
        this.userDetailService = userDetailService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (Arrays.stream(this.excludedPaths).anyMatch(path -> request.getRequestURI().endsWith(path))) {
            System.out.println("Skipping JWT filter for path: " + request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        Optional<Cookie> cookie = getCookie(request, "token");
        String jwt = null;
        String email = null;

        if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            email = jwtUtil.extractUsername(jwt);
        }

        if (cookie.isPresent()) {
            jwt = cookie.get().getValue();
            email = jwtUtil.extractUsername(jwt);
        }

        System.out.println("Request: " + request.getMethod() + " -> " + request.getRequestURI() + "  " + jwt + "    " + email);

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailService.loadUserByUsername(email);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(email, userDetails.getPassword(), userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    public Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return Optional.empty();

        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("token"))
                .findFirst();
    }
}