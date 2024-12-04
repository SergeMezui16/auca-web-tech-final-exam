package auca.recipe.service;

import auca.recipe.dto.IngredientDto;
import auca.recipe.dto.RecipeDto;
import auca.recipe.entity.Ingredient;
import auca.recipe.entity.Recipe;
import auca.recipe.repository.IngredientRepository;
import auca.recipe.repository.RecipeRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    public final RecipeRepository repository;

    private final IngredientRepository ingredientRepository;

    public RecipeService(RecipeRepository repository, IngredientRepository ingredientRepository) {
        this.repository = repository;
        this.ingredientRepository = ingredientRepository;
    }

    /**
     * Creates a new Recipe entity using the provided RecipeDto and saves it to the repository.
     *
     * @todo set author from the session
     * @param dto the RecipeDto containing the data to be used for creating the Recipe
     * @return the created Recipe entity after it has been saved to the repository
     */
    public Recipe create(@Valid RecipeDto dto) {
        return repository.save(new Recipe(dto.getName(), dto.getDescription()));
    }

    public Optional<Recipe> update(Long id, @Valid RecipeDto dto) {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            recipe.get().update(dto.getName(), dto.getDescription());
            return Optional.of(this.repository.save(recipe.get()));
        }

        return Optional.empty();
    }

    public Optional<Recipe> publish(Long id) {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            recipe.get().setPublished(true);
            this.repository.save(recipe.get());
            return recipe;
        }

        return Optional.empty();
    }

    public Optional<Long> delete(Long id) {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            this.repository.deleteById(id);
            return Optional.of(id);
        }

        return Optional.empty();
    }

    public Optional<Ingredient> addIngredient(Long id, IngredientDto dto) {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            Ingredient ingredient = new Ingredient(recipe.get(), dto.getName(), dto.getQuantity());
            recipe.get().addIngredient(ingredient);
            this.repository.save(recipe.get());
            this.ingredientRepository.save(ingredient);
            return Optional.of(ingredient);
        }

        return Optional.empty();
    }

    public Optional<Long> removeIngredient(Long recipeId, Long ingredientId) {
        Optional<Recipe> recipe = this.repository.findById(recipeId);
        Optional<Ingredient> ingredient = this.ingredientRepository.findById(ingredientId);

        if (recipe.isPresent() && ingredient.isPresent()) {
            recipe.get().removeIngredient(ingredient.get());
            this.ingredientRepository.deleteById(ingredientId);
            this.repository.save(recipe.get());
            return Optional.of(ingredientId);
        }

        return Optional.empty();
    }

    public Optional<Ingredient> editIngredient(Long recipeId, Long ingredientId, @Valid IngredientDto dto) {
        Optional<Recipe> recipe = this.repository.findById(recipeId);
        Optional<Ingredient> ingredient = this.ingredientRepository.findById(ingredientId);

        if (recipe.isPresent() && ingredient.isPresent()) {

            ingredient.get().update(dto.getName(), dto.getQuantity());
            this.ingredientRepository.save(ingredient.get());
            this.repository.save(recipe.get());
            return ingredient;
        }

        return Optional.empty();
    }

    public List<Ingredient> getIngredients(Long id) {
        return this.ingredientRepository.findAllByRecipeId(id);
    }

    public Optional<Ingredient> getIngredient(Long id) {
        return this.ingredientRepository.findById(id);
    }
}
