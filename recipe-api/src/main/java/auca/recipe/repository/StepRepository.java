package auca.recipe.repository;

import auca.recipe.entity.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StepRepository extends JpaRepository<Step, Long> {

    List<Step> findAllByRecipeId(Long id);
}
