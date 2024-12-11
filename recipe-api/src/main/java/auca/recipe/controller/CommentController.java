package auca.recipe.controller;

import auca.recipe.dto.CommentDto;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes/{id}/comments")
public class CommentController extends AbstractApiController {

    private final RecipeService service;

    public CommentController(RecipeService service) {
        this.service = service;
    }

    @PostMapping
    @JsonView(RecipeViews.Summary.class)
    public ResponseEntity<?> add(@PathVariable Long id, @Valid @RequestBody CommentDto dto) {
        return this.send(this.service.addComment(id, dto));
    }

    @GetMapping
    @JsonView(RecipeViews.Summary.class)
    public ResponseEntity<?> index(@PathVariable Long id) {
        return this.send(this.service.getComments(id));
    }
}
