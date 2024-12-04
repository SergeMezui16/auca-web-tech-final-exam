package auca.recipe.validation.annotation;

import auca.recipe.validation.validator.UniqueUserEmailValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueUserEmailValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueRecipeIngredient {
    String message() default "This ingredient is already in use.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}