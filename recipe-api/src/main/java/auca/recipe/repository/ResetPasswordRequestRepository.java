package auca.recipe.repository;

import auca.recipe.entity.ResetPasswordRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetPasswordRequestRepository extends JpaRepository<ResetPasswordRequest, Long> {

    public Optional<ResetPasswordRequest> findByToken(String token);
}
