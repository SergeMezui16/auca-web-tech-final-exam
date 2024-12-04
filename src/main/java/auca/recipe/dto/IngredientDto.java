package auca.recipe.dto;

import jakarta.validation.constraints.*;
import org.springframework.format.annotation.NumberFormat;

public class IngredientDto {
    @NotBlank
    private String name;

    @Min(1)
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @NotNull
    private Integer quantity;

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
}
