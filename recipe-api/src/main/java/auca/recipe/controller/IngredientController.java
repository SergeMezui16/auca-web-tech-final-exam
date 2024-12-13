package auca.recipe.controller;

import auca.recipe.dto.IngredientDto;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
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
    public ResponseEntity<?> add(@PathVariable Long id, @Valid @RequestBody IngredientDto dto) {
        return this.send(this.service.addIngredient(id, dto));
    }

    @GetMapping
    public ResponseEntity<?> index(@PathVariable Long id) {
        return this.send(this.service.getIngredients(id));
    }

    @GetMapping("/{ingredient}")
    public ResponseEntity<?> show(@PathVariable Long ingredient) {
        return this.send(this.service.getIngredient(ingredient));
    }

    @PutMapping("/{ingredient}")
    public ResponseEntity<?> edit(@PathVariable Long id, @PathVariable Long ingredient, @Valid @RequestBody IngredientDto dto) {
        return this.send(this.service.editIngredient(id, ingredient, dto));
    }

    @DeleteMapping("/{ingredient}")
    public ResponseEntity<?> remove(@PathVariable Long id, @PathVariable Long ingredient) {
        return this.send(this.service.removeIngredient(id, ingredient));
    }
}
