package auca.recipe.service;

import auca.recipe.dto.CreateUserDto;
import auca.recipe.dto.UpdateUserDto;
import auca.recipe.entity.Recipe;
import auca.recipe.entity.User;
import auca.recipe.repository.RecipeRepository;
import auca.recipe.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    public final UserRepository repository;
    public final RecipeRepository recipeRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder, RecipeRepository recipeRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.recipeRepository = recipeRepository;
    }

    public User create(@Valid CreateUserDto dto) {
        User user = new User(
                dto.getName(),
                dto.getEmail(),
                this.passwordEncoder.encode(dto.getPassword()),
                dto.getBio()
        );

        return repository.save(user);
    }

    public Page<User> paginate(Pageable pageable, String name) {
        if (name != null) return this.repository.findByNameContaining(pageable, name);
        return this.repository.findAll(pageable);
    }

    public Optional<User> update(Long id, @Valid UpdateUserDto dto) {
        Optional<User> user = this.repository.findById(id);

        if (user.isPresent()) {
            user.get().setName(dto.getName());
            user.get().setBio(dto.getBio());

            return Optional.of(this.repository.save(user.get()));
        }

        return Optional.empty();
    }

    public Optional<Long> delete(Long id) {
        Optional<User> user = this.repository.findById(id);

        if (user.isPresent()) {
            this.repository.deleteById(id);
            return Optional.of(id);
        }

        return Optional.empty();
    }

    public List<Recipe> getRecipes(Long id) {
        return this.recipeRepository.findByUserId(id);
    }
}
