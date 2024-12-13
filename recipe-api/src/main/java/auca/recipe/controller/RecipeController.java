package auca.recipe.controller;

import auca.recipe.dto.RateDto;
import auca.recipe.dto.RecipeDto;
import auca.recipe.entity.File;
import auca.recipe.entity.Recipe;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeController extends AbstractApiController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> index() {
        return this.send(this.service.repository.findByIsPublished(true));
    }

    @GetMapping("/paginate")
    public ResponseEntity<Page<Recipe>> paginate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean asc,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer duration
    ) {
        Sort sort = asc ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return this.send(this.service.paginate(PageRequest.of(page, size, sort), name, description, duration));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody RecipeDto dto) throws Exception {
        return this.send(this.service.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        return this.send(this.service.repository.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody RecipeDto dto, @PathVariable Long id) {
        return this.send(this.service.update(id, dto));
    }

    @GetMapping("/{id}/publish")
    public ResponseEntity<?> publish(@PathVariable Long id) {
        return this.send(this.service.publish(id));
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<?> upload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return this.send(this.service.upload(id, file));
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Optional<File> file = this.service.getImage(id);

        if (file.isEmpty()) return this.sendNotFound();

        return this.sendAttachment(file.get().getName(), file.get().getType(), file.get().getData());
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<?> rate(@PathVariable Long id, @Valid @RequestBody RateDto dto) throws Exception {
        return this.send(this.service.addRating(id, dto));
    }
}
