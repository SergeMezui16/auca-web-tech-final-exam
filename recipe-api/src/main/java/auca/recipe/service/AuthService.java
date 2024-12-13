package auca.recipe.service;

import auca.recipe.dto.EmailDto;
import auca.recipe.dto.PasswordResetDto;
import auca.recipe.dto.ResetPasswordRequestDto;
import auca.recipe.entity.ResetPasswordRequest;
import auca.recipe.entity.User;
import auca.recipe.repository.ResetPasswordRequestRepository;
import auca.recipe.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository repository;
    private final AuthenticationManager authenticationManager;
    private final ResetPasswordRequestRepository resetPasswordRequestRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository repository, AuthenticationManager authenticationManager, ResetPasswordRequestRepository resetPasswordRequestRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.resetPasswordRequestRepository = resetPasswordRequestRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
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

    public ResetPasswordRequestDto resetPasswordRequest(ResetPasswordRequestDto dto) {
        Optional<User> user = this.repository.findByEmail(dto.getEmail());

        if (user.isPresent()) {
            String token = this.generateToken();
            String link = dto.getLink() + "?token=" + token;
            ResetPasswordRequest request = new ResetPasswordRequest(user.get(), token);

            EmailDto email = new EmailDto(user.get().getEmail(), "Reset password request link", "Your reset password request is ready, click on the link to access it: \n " + link + "\nThis link will expire in 1 hour.");
            this.emailService.send(email);
            this.resetPasswordRequestRepository.save(request);
        }

        return dto;
    }

    public PasswordResetDto resetPassword(PasswordResetDto dto) {
        Optional<ResetPasswordRequest> request = this.resetPasswordRequestRepository.findByToken(dto.getToken());

        if (request.isPresent()) {
            User user = request.get().getUser();

            user.setPassword(this.passwordEncoder.encode(dto.getPassword()));
            this.repository.save(user);
            this.resetPasswordRequestRepository.delete(request.get());
        }

        return dto;
    }

    private String generateToken() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 24);
    }
}
