package auca.recipe.controller;

import auca.recipe.dto.CommentDto;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
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
    public ResponseEntity<?> add(@PathVariable Long id, @Valid @RequestBody CommentDto dto) throws Exception {
        return this.send(this.service.addComment(id, dto));
    }

    @GetMapping
    public ResponseEntity<?> index(@PathVariable Long id) {
        return this.send(this.service.getComments(id));
    }
}
