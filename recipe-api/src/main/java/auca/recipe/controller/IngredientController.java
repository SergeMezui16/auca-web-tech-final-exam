package auca.recipe.controller;

import auca.recipe.dto.IngredientDto;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes/{id}/ingredients")
public class IngredientController extends AbstractApiController {

    private final RecipeService service;

    public IngredientController(RecipeService service) {
        this.service = service;
    }

    @PostMapping
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> add(@PathVariable Long id, @Valid @RequestBody IngredientDto dto) {
        return this.send(this.service.addIngredient(id, dto));
    }

    @GetMapping
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> index(@PathVariable Long id) {
        return this.send(this.service.getIngredients(id));
    }

    @GetMapping("/{ingredient}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> show(@PathVariable Long ingredient) {
        return this.send(this.service.getIngredient(ingredient));
    }

    @PutMapping("/{ingredient}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> edit(@PathVariable Long id, @PathVariable Long ingredient, @Valid @RequestBody IngredientDto dto) {
        return this.send(this.service.editIngredient(id, ingredient, dto));
    }

    @DeleteMapping("/{ingredient}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> remove(@PathVariable Long id, @PathVariable Long ingredient) {
        return this.send(this.service.removeIngredient(id, ingredient));
    }
}
