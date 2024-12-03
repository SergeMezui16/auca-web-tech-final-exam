package auca.recipe.dto;

import auca.recipe.validation.UniqueUserEmail;
import jakarta.validation.constraints.*;

public class CreateUserDto {

    @NotBlank
    @Size(min = 3, max = 20)
    private String name;

    @NotNull
    @NotBlank
    @Email
    @UniqueUserEmail
    private String email;

    @NotNull
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "Password must contain at least height characters, one uppercase letter, one lowercase letter, one digit, and one special character.")
    private String password;

    @NotNull
    private String bio;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
