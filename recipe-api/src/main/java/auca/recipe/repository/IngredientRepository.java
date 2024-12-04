package auca.recipe.repository;

import auca.recipe.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findAllByRecipeId(Long id);

    boolean existsByName(String name);

    List<Ingredient> findByName(String name);
}
