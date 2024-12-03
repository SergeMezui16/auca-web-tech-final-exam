package auca.recipe.dto;

import jakarta.validation.constraints.*;

public class UpdateUserDto {

    @NotBlank
    @Size(min = 3, max = 20)
    private String name;

    @NotNull
    private String bio;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
