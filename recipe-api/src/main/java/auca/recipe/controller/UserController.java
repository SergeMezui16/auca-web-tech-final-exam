package auca.recipe.controller;

import auca.recipe.dto.CreateUserDto;
import auca.recipe.dto.UpdateUserDto;
import auca.recipe.service.UserService;
import auca.recipe.utils.AbstractApiController;
import auca.recipe.view.UserViews;
import com.fasterxml.jackson.annotation.JsonView;
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
    @JsonView(UserViews.Summary.class)
    public ResponseEntity<?> index() {
        return this.send(this.service.repository.findAll());
    }

    @PostMapping
    @JsonView(UserViews.Detailed.class)
    public ResponseEntity<?> create(@Valid @RequestBody CreateUserDto dto) {
        return this.send(this.service.create(dto));
    }

    @GetMapping("/{id}")
    @JsonView(UserViews.Detailed.class)
    public ResponseEntity<?> show(@PathVariable Long id) {
        return this.send(this.service.repository.findById(id));
    }

    @PutMapping("/{id}")
    @JsonView(UserViews.Detailed.class)
    public ResponseEntity<?> edit(@Valid @RequestBody UpdateUserDto dto, @PathVariable Long id) {
        return this.send(this.service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return this.send(this.service.delete(id));
    }
}
