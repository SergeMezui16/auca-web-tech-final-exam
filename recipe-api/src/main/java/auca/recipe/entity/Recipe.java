package auca.recipe.entity;

import auca.recipe.utils.Util;
import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(RecipeViews.Summary.class)
    private Long id;

    @JsonView(RecipeViews.Summary.class)
    private String slug;

    @JsonView(RecipeViews.Summary.class)
    private String name;

    @JsonView(RecipeViews.Summary.class)
    private String description;

    @JsonView(RecipeViews.Summary.class)
    private Boolean isPublished;

    @JsonView(RecipeViews.Summary.class)
    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(RecipeViews.Summary.class)
    private Date creationDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonView(RecipeViews.Summary.class)
    private User user;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @JsonView(RecipeViews.Detailed.class)
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @JsonView(RecipeViews.Detailed.class)
    private List<Step> steps;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Rating> ratings;

    public Recipe() {
    }

    public Recipe(String name, String description) {
        this.name = name;
        this.description = description;
        this.slug = Util.toSlug(name);
        this.isPublished = false;
        this.creationDate = new Date();
    }

    public void update(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @JsonView(RecipeViews.Summary.class)
    public Double getRate() {
        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }

        double total = 0.0;
        for (Rating rating : ratings) {
            total += rating.getScore();
        }

        return total / ratings.size();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPublished() {
        return isPublished;
    }

    public void setPublished(Boolean published) {
        isPublished = published;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void addIngredient(Ingredient ingredient) {
        ingredient.setRecipe(this);
        this.ingredients.add(ingredient);
    }

    public void removeIngredient(Ingredient ingredient) {
        this.ingredients.remove(ingredient);
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public void addStep(Step step) {
        step.setRecipe(this);
        this.steps.add(step);
    }

    public void removeStep(Step step) {
        this.steps.remove(step);
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void removeComment(Comment comment) {
        this.comments.remove(comment);
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public void addRating(Rating rating) {
        this.ratings.add(rating);
    }

    public void removeRating(Rating rating) {
        this.ratings.remove(rating);
    }

    public String getSlug() {
        return slug;
    }
}

