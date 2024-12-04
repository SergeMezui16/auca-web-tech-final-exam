package auca.recipe.validation.validator;

import auca.recipe.repository.UserRepository;
import auca.recipe.validation.annotation.UniqueUserEmail;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Service;

@Service
public class UniqueUserEmailValidator implements ConstraintValidator<UniqueUserEmail, String> {

    private final UserRepository userRepository;

    public UniqueUserEmailValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return email != null && !userRepository.existsByEmail(email);
    }
}