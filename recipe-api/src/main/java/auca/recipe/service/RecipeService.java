package auca.recipe.service;

import auca.recipe.dto.CommentDto;
import auca.recipe.dto.IngredientDto;
import auca.recipe.dto.RateDto;
import auca.recipe.dto.RecipeDto;
import auca.recipe.entity.*;
import auca.recipe.repository.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    public final RecipeRepository repository;

    private final IngredientRepository ingredientRepository;

    private final StepRepository stepRepository;

    private final FileService fileService;

    private final CommentRepository commentRepository;

    private final AuthService authService;

    private final RatingRepository ratingRepository;

    public RecipeService(RecipeRepository repository, IngredientRepository ingredientRepository, StepRepository stepRepository, FileService fileService, CommentRepository commentRepository, AuthService authService, RatingRepository ratingRepository) {
        this.repository = repository;
        this.ingredientRepository = ingredientRepository;
        this.stepRepository = stepRepository;
        this.fileService = fileService;
        this.commentRepository = commentRepository;
        this.authService = authService;
        this.ratingRepository = ratingRepository;
    }

    public Page<Recipe> paginate(Pageable pageable, String name, String description, Integer duration) {

        if (name != null) {
            return this.repository.findByNameContaining(pageable, name);
        }

        if (description != null) {
            return this.repository.findByDescriptionContaining(pageable, description);
        }

        if (duration != null) {
            return this.repository.findByDurationIs(pageable, duration);
        }

        return this.repository.findAll(pageable);
    }

    public Optional<Rating> addRating(Long id, RateDto dto) throws Exception {
        Optional<Recipe> recipe = this.repository.findById(id);
        User user = this.authService.getLoggedUser();

        if (recipe.isEmpty()) return Optional.empty();

        boolean hasRating = this.ratingRepository.findOneByRecipeAndUser(recipe.get(), user) != null;

        if (!hasRating) {
            Rating rating = new Rating(dto.getScore(), recipe.get(), user);
            recipe.get().addRating(rating);
            this.repository.save(recipe.get());
            return Optional.of(rating);
        }

        return Optional.empty();
    }

    public Optional<Comment> addComment(Long id, CommentDto dto) throws Exception {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            Comment comment = new Comment(dto.getContent(), recipe.get(), this.authService.getLoggedUser());
            recipe.get().addComment(comment);
            this.repository.save(recipe.get());
            return Optional.of(comment);
        }

        return Optional.empty();
    }

    public List<Comment> getComments(Long id) {
        return this.commentRepository.findAllByRecipeId(id);
    }

    public Optional<File> upload(Long id, MultipartFile uploadedFile) {
        Optional<Recipe> recipe = this.repository.findById(id);
        if (recipe.isEmpty()) return Optional.empty();

        try {
            File file = fileService.store(uploadedFile);
            recipe.get().setImage(file);
            this.repository.save(recipe.get());
            return Optional.of(file);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<File> getImage(Long id) {
        Optional<Recipe> recipe = this.repository.findById(id);
        return recipe.map(Recipe::getImage);
    }

    public Recipe create(@Valid RecipeDto dto) throws Exception {
        return repository.save(new Recipe(dto.getName(), dto.getDescription(), dto.getDuration(), this.authService.getLoggedUser()));
    }

    public Optional<Recipe> update(Long id, @Valid RecipeDto dto) {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            recipe.get().update(dto.getName(), dto.getDescription(), dto.getDuration());
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

    public Optional<Step> editStep(Long recipeId, Long stepId, @Valid Step dto) {
        Optional<Recipe> recipe = this.repository.findById(recipeId);
        Optional<Step> step = this.stepRepository.findById(stepId);

        if (recipe.isPresent() && step.isPresent()) {
            step.get().update(dto.getPosition(), dto.getTitle(), dto.getDescription());
            this.repository.save(recipe.get());
            return step;
        }

        return Optional.empty();
    }

    public Optional<Long> removeStep(Long recipeId, Long stepId) {
        Optional<Recipe> recipe = this.repository.findById(recipeId);
        Optional<Step> step = this.stepRepository.findById(stepId);

        if (recipe.isPresent() && step.isPresent()) {
            recipe.get().removeStep(step.get());
            this.stepRepository.deleteById(stepId);
            this.repository.save(recipe.get());
            return Optional.of(stepId);
        }

        return Optional.empty();
    }

    public Optional<Step> addStep(Long id, @Valid Step step) {
        Optional<Recipe> recipe = this.repository.findById(id);

        if (recipe.isPresent()) {
            recipe.get().addStep(new Step().update(step.getPosition(), step.getTitle(), step.getDescription()));
            this.repository.save(recipe.get());

            return Optional.of(step);
        }

        return Optional.empty();
    }

    public List<Step> getSteps(Long id) {
        return this.stepRepository.findAllByRecipeId(id);
    }

    public Optional<Step> getStep(Long id) {
        return this.stepRepository.findById(id);
    }
}
