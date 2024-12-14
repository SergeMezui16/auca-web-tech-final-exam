package auca.recipe.controller;

import auca.recipe.dto.CreateUserDto;
import auca.recipe.dto.UpdateUserDto;
import auca.recipe.entity.User;
import auca.recipe.service.UserService;
import auca.recipe.utils.AbstractApiController;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController extends AbstractApiController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/paginate")
    public ResponseEntity<Page<User>> paginate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean asc,
            @RequestParam(required = false) String name
    ) {
        Sort sort = asc ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return this.send(this.service.paginate(PageRequest.of(page, size, sort), name));
    }

    @GetMapping
    public ResponseEntity<List<User>> index() {
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
