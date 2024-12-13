package auca.recipe.controller;

import auca.recipe.dto.PasswordResetDto;
import auca.recipe.dto.ResetPasswordRequestDto;
import auca.recipe.service.AuthService;
import auca.recipe.utils.AbstractApiController;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ResetPasswordController extends AbstractApiController {

    private final AuthService authService;

    public ResetPasswordController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/reset_password_request")
    public ResponseEntity<?> resetPasswordRequest(@RequestBody ResetPasswordRequestDto dto) {
        System.out.println(dto.getEmail() + "   " + dto.getLink());
        return send(this.authService.resetPasswordRequest(dto));
    }

    @PostMapping("/reset_password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetDto dto) {
        return send(this.authService.resetPassword(dto));
    }
}
