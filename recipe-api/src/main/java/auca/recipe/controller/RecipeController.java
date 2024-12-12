package auca.recipe.controller;

import auca.recipe.dto.RateDto;
import auca.recipe.dto.RecipeDto;
import auca.recipe.entity.File;
import auca.recipe.entity.Recipe;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.Valid;
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
    @JsonView(RecipeViews.Summary.class)
    public ResponseEntity<List<Recipe>> index() {
        return this.send(this.service.repository.findAll());
    }

    @PostMapping
    @JsonView(RecipeViews.Summary.class)
    public ResponseEntity<?> create(@Valid @RequestBody RecipeDto dto) throws Exception {
        return this.send(this.service.create(dto));
    }

    @GetMapping("/{id}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> show(@PathVariable Long id) {
        return this.send(this.service.repository.findById(id));
    }

    @PutMapping("/{id}")
    @JsonView(RecipeViews.Summary.class)
    public ResponseEntity<?> edit(@Valid @RequestBody RecipeDto dto, @PathVariable Long id) {
        return this.send(this.service.update(id, dto));
    }

    @GetMapping("/{id}/publish")
    @JsonView(RecipeViews.Summary.class)
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
    @JsonView(RecipeViews.Summary.class)
    public ResponseEntity<?> rate(@PathVariable Long id, @Valid @RequestBody RateDto dto) throws Exception {
        return this.send(this.service.addRating(id, dto));
    }
}
