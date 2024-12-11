package auca.recipe.dto;

import jakarta.validation.constraints.*;

public class RecipeDto {

    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    @Size(min = 16)
    private String description;

    @NotNull
    @Min(0)
    private Integer duration;

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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}
