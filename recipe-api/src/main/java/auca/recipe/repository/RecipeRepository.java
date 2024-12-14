package auca.recipe.repository;

import auca.recipe.entity.Ingredient;
import auca.recipe.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("SELECT i FROM Ingredient i WHERE i.recipe.id = :recipeId")
    List<Ingredient> getIngredientsById(@Param("recipeId") Long recipeId);

    Page<Recipe> findByNameContaining(Pageable pageable, String name);

    Page<Recipe> findByDescriptionContaining(Pageable pageable, String description);

    Page<Recipe> findByDurationIs(Pageable pageable, Integer duration);

    Page<Recipe> findByIsPublished(Pageable pageable, boolean isPublished);

    List<Recipe> findByIsPublished(boolean isPublished);

    List<Recipe> findByUserId(Long id);
}
