package auca.recipe.entity;

import auca.recipe.view.RecipeViews;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(RecipeViews.Summary.class)
    private Long id;

    @JsonView(RecipeViews.Summary.class)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(RecipeViews.Summary.class)
    private Date timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public Comment() {}

    public Comment(String content, Recipe recipe) {
        this.content = content;
        this.timestamp = new Date();
        this.recipe = recipe;
    }

    @JsonView(RecipeViews.Summary.class)
    public String getUsername() {
        if (this.user == null) return null;

        return this.user.getName();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}

