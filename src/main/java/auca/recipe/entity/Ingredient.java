package auca.recipe.entity;

import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(RecipeViews.Detailed.class)
    private Long id;

    @JsonView(RecipeViews.Detailed.class)
    private String name;

    @JsonView(RecipeViews.Detailed.class)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public Ingredient() {}

    public Ingredient(Recipe recipe ,String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
        this.recipe = recipe;
    }

    public void update(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}

