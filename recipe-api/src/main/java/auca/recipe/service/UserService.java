package auca.recipe.service;

import auca.recipe.dto.CreateUserDto;
import auca.recipe.dto.UpdateUserDto;
import auca.recipe.entity.User;
import auca.recipe.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    public UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
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
}
