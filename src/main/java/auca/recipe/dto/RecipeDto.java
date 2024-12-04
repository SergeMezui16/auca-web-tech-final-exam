package auca.recipe.dto;

import jakarta.validation.constraints.*;

public class RecipeDto {

    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    @Size(min = 16)
    private String description;

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
}
