package auca.recipe.controller;

import auca.recipe.dto.CreateUserDto;
import auca.recipe.dto.UpdateUserDto;
import auca.recipe.service.UserService;
import auca.recipe.utils.AbstractApiController;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/users")
public class UserController extends AbstractApiController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> index() {
        return this.send(this.service.repository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateUserDto dto) {
        return this.send(this.service.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        return this.send(this.service.repository.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody UpdateUserDto dto, @PathVariable Long id) {
        return this.send(this.service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return this.send(this.service.delete(id));
    }
}
