package auca.recipe.repository;

import auca.recipe.entity.Rating;
import auca.recipe.entity.Recipe;
import auca.recipe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    Rating findOneByRecipeAndUser(Recipe recipe, User user);
}
