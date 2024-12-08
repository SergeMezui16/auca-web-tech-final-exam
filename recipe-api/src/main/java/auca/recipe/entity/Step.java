package auca.recipe.entity;

import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(RecipeViews.Detailed.class)
    private Long id;

    @JsonView(RecipeViews.Detailed.class)
    @NotNull
    @Min(1)
    private Integer position;

    @NotBlank
    @JsonView(RecipeViews.Detailed.class)
    private String title;

    @NotBlank
    @JsonView(RecipeViews.Detailed.class)
    private String description;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public Step() {}

    public Step update(Integer position, String title, String description) {
        this.position = position;
        this.title = title;
        this.description = description;
        return this;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

