package auca.recipe.controller;

import auca.recipe.entity.Step;
import auca.recipe.service.RecipeService;
import auca.recipe.utils.AbstractApiController;
import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes/{id}/steps")
public class StepController extends AbstractApiController {

    private final RecipeService service;

    public StepController(RecipeService service) {
        this.service = service;
    }

    @PostMapping
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> add(@PathVariable Long id, @Valid @RequestBody Step dto) {
        return this.send(this.service.addStep(id, dto));
    }

    @GetMapping
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> index(@PathVariable Long id) {
        return this.send(this.service.getSteps(id));
    }

    @GetMapping("/{step}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> show(@PathVariable Long step) {
        return this.send(this.service.getStep(step));
    }

    @PutMapping("/{step}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> edit(@PathVariable Long id, @PathVariable Long step, @Valid @RequestBody Step dto) {
        return this.send(this.service.editStep(id, step, dto));
    }

    @DeleteMapping("/{step}")
    @JsonView(RecipeViews.Detailed.class)
    public ResponseEntity<?> remove(@PathVariable Long id, @PathVariable Long step) {
        return this.send(this.service.removeIngredient(id, step));
    }
}
