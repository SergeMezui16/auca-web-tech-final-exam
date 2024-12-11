package auca.recipe.dto;

import jakarta.validation.constraints.*;

public class RateDto {

    @NotNull
    @Min(0)
    @Max(5)
    private Integer score;


    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
