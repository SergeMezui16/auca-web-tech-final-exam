package auca.recipe.validation.validator;

import auca.recipe.entity.Ingredient;
import auca.recipe.entity.Recipe;
import auca.recipe.repository.IngredientRepository;
import auca.recipe.validation.annotation.UniqueRecipeIngredient;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UniqueRecipeIngredientValidator implements ConstraintValidator<UniqueRecipeIngredient, String> {

    private final IngredientRepository repository;

    public UniqueRecipeIngredientValidator(IngredientRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if(name == null) return true;

        List<Ingredient> ingredients = repository.findByName(name);
        
        if(ingredients.isEmpty()) return true;

        for (Ingredient ingredient : ingredients) {
            Recipe recipe = ingredient.getRecipe();

            if (ingredients.stream().anyMatch(i -> !Objects.equals(i.getRecipe().getId(), recipe.getId())))
                return false;
        }

        return true;
    }
}