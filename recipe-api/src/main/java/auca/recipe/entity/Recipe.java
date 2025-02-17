package auca.recipe.entity;

import auca.recipe.utils.Util;
import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;

    private String name;

    private String description;

    private Boolean isPublished;

    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @JsonView(RecipeViews.Summary.class)
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "file_id")
    @JsonIgnore
    private File image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Step> steps;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Rating> ratings;

    public Recipe() {
    }

    public Recipe(String name, String description, Integer duration, User author) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.slug = Util.toSlug(name);
        this.isPublished = false;
        this.creationDate = new Date();
        this.user = author;
    }

    public void update(String name, String description, Integer duration) {
        this.name = name;
        this.description = description;
        this.duration = duration;
    }

    @JsonInclude
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
        if (this.image == null) return null;

        return "/recipes/" + id + "/image";
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public File getImage() {
        return image;
    }

    public void setImage(File image) {
        this.image = image;
    }
}

