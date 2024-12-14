package auca.recipe.controller;

import auca.recipe.dto.UpdateUserDto;
import auca.recipe.service.AuthService;
import auca.recipe.service.UserService;
import auca.recipe.utils.AbstractApiController;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController extends AbstractApiController {

    private final AuthService authService;

    private final UserService service;

    public AccountController(AuthService authService, UserService service) {
        this.authService = authService;
        this.service = service;
    }

    @PutMapping()
    public ResponseEntity<?> update(@Valid @RequestBody UpdateUserDto dto) throws Exception {
        return this.send(service.update(this.authService.getLoggedUser().getId(), dto));
    }

    @GetMapping("/recipes")
    public ResponseEntity<?> recipes() throws Exception {
        return this.send(this.service.getRecipes(this.authService.getLoggedUser().getId()));
    }
}
