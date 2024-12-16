package auca.recipe.configuration;

import auca.recipe.entity.*;
import auca.recipe.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Configuration
public class DataLoader {

    private final String[] recipeName = {
            "Classic Spaghetti Bolognese",
            "Garlic Butter Shrimp Pasta",
            "Chicken Alfredo Delight",
            "Crispy Fried Chicken",
            "Cheesy Broccoli Casserole",
            "Ultimate Beef Burger",
            "Homemade Margherita Pizza",
            "Vegan Buddha Bowl",
            "Honey Garlic Glazed Salmon",
            "Spicy Thai Green Curry",
            "Vegetarian Stuffed Bell Peppers",
            "Shepherd's Pie Supreme",
            "Creamy Mushroom Risotto",
            "Tex-Mex Chicken Fajitas",
            "Pulled Pork Sliders",
            "BBQ Ribs with Secret Sauce",
            "Taco Tuesday Special",
            "Spinach and Feta Quiche",
            "Mediterranean Hummus Platter",
            "Chocolate Lava Cake",
            "French Onion Soup",
            "Blueberry Pancakes",
            "Lemon Herb Roast Chicken",
            "Shrimp Tacos with Mango Salsa",
            "Cajun Jambalaya",
            "Beef Stroganoff",
            "Vegetable Pad Thai",
            "Sweet Potato and Kale Salad",
            "Grilled Zucchini and Halloumi",
            "Eggplant Parmesan",
            "Buffalo Chicken Wings",
            "Lobster Mac and Cheese",
            "Turkey Meatloaf",
            "Carrot Ginger Soup",
            "Smashed Avocado Toast",
            "Pineapple Fried Rice",
            "Moroccan Chickpea Stew",
            "Teriyaki Chicken Stir Fry",
            "Margarita Lime Grilled Shrimp",
            "Pumpkin Spice Cheesecake",
            "Loaded Beef Nachos",
            "Gourmet Grilled Cheese Sandwich",
            "Indian Butter Chicken",
            "Stuffed Portobello Mushrooms",
            "Hearty Minestrone Soup",
            "Coconut Curry Lentils",
            "Coffee Tiramisu",
            "Slow Cooker Beef Chili",
            "Zesty Lemon Bars",
            "Banana Nut Muffins"
    };

    private final String[] ingredientName = {
            "All-Purpose Flour",
            "Granulated Sugar",
            "Brown Sugar",
            "Butter",
            "Eggs",
            "Milk",
            "Salt",
            "Baking Soda",
            "Vanilla Extract",
            "Chocolate Chips",
            "Olive Oil",
            "Garlic",
            "Onions",
            "Tomatoes",
            "Bell Peppers",
            "Carrots",
            "Potatoes",
            "Chicken Breast",
            "Ground Beef",
            "Salmon",
            "Shrimp",
            "Rice",
            "Pasta",
            "Bread Crumbs",
            "Cheddar Cheese",
            "Parmesan Cheese",
            "Mozzarella Cheese",
            "Spinach",
            "Mushrooms",
            "Avocado",
            "Basil Leaves",
            "Cilantro",
            "Soy Sauce",
            "Honey",
            "Lemon",
            "Lime",
            "Cinnamon",
            "Nutmeg",
            "Paprika",
            "Cumin",
            "Chili Powder",
            "Black Pepper",
            "Thyme",
            "Rosemary",
            "Oregano",
            "Chicken Stock",
            "Heavy Cream",
            "Cocoa Powder",
            "Yeast",
            "Almonds",
            "Walnuts"
    };

    private final String[] cookingSteps = {
            "Preheat the oven to 180°C (350°F).",
            "Chop the onions and garlic finely.",
            "Boil pasta in salted water according to package instructions.",
            "Heat oil in a large skillet over medium heat.",
            "Sauté onions and garlic until translucent.",
            "Add ground beef and cook until browned.",
            "Season with salt, pepper, and paprika.",
            "Stir in tomato paste and let it simmer.",
            "Add the diced vegetables and cook for 5 minutes.",
            "Whisk eggs in a small bowl.",
            "Grease a baking dish with butter or cooking spray.",
            "Layer the lasagna sheets with meat sauce and cheese.",
            "Bake for 25-30 minutes until golden brown.",
            "Combine flour, sugar, and baking soda in a bowl.",
            "Fold in chocolate chips into the dough.",
            "Roll out the pastry dough on a floured surface.",
            "Marinate the chicken with soy sauce and spices.",
            "Grill the chicken for 10 minutes on each side.",
            "Simmer the soup on low heat for 20 minutes.",
            "Garnish with fresh parsley before serving.",
            "Slice the bread and toast until golden brown.",
            "Brush olive oil on both sides of the bread.",
            "Mix yogurt with honey and vanilla extract.",
            "Roast the vegetables in the oven for 15 minutes.",
            "Mash the boiled potatoes until smooth.",
            "Melt butter in a saucepan over low heat.",
            "Add the stock and bring to a gentle boil.",
            "Let the sauce simmer until it thickens.",
            "Grate the cheese and sprinkle it on top.",
            "Peel and dice the potatoes into small cubes.",
            "Steam the broccoli until it is tender.",
            "Prepare the grill and season the meat.",
            "Add lemon juice and zest for extra flavor.",
            "Whip the cream until it forms soft peaks.",
            "Cook the rice in boiling water until fluffy.",
            "Add soy sauce and stir-fry for 5 minutes.",
            "Make a well in the center of the flour mixture.",
            "Blend the ingredients until smooth and creamy.",
            "Let the dough rise in a warm place for 1 hour.",
            "Spread the batter evenly in the baking pan.",
            "Caramelize the sugar until it turns golden brown.",
            "Coat the chicken with breadcrumbs and fry it.",
            "Reduce the heat and let the dish simmer.",
            "Separate egg yolks from the whites.",
            "Cool the cake in the pan before removing.",
            "Brush the glaze over the pastries for shine.",
            "Skewer the vegetables for grilling.",
            "Mince the herbs and mix into the dressing.",
            "Test the dish for seasoning and adjust.",
            "Serve the dessert with a dollop of whipped cream.",
            "Enjoy your meal!"
    };

    private final String[] recipeComments = {
            "This recipe is amazing! My whole family loved it.",
            "I followed the steps exactly, and it turned out perfect.",
            "Delicious! I’ll definitely make this again.",
            "The instructions were super easy to follow.",
            "I added a little extra spice, and it was even better!",
            "Quick and simple recipe, just what I needed.",
            "This is the best dish I’ve cooked in a long time.",
            "The flavors were incredible. Thank you for sharing!",
            "I made this for dinner, and everyone had seconds.",
            "The recipe was good, but I would reduce the salt next time.",
            "Perfectly balanced flavors—just like in a restaurant!",
            "I improvised with some ingredients, and it still came out great!",
            "The step-by-step instructions were very helpful.",
            "A great dish for beginners. Highly recommend it!",
            "It was alright, but I felt it needed more seasoning.",
            "I loved how fast and easy this recipe is to make.",
            "Wow, this is my new favorite recipe!",
            "My kids absolutely loved it. Thank you!",
            "A fun recipe to cook, and it tasted fantastic.",
            "This dish reminds me of my grandma’s cooking. Nostalgic!",
            "Perfect for dinner parties. Got so many compliments!",
            "I substituted dairy-free ingredients, and it still worked well.",
            "Loved the simplicity yet bold flavor of this dish.",
            "This would be perfect for a holiday meal!",
            "The flavors were a bit mild for my liking.",
            "I overcooked it a little, but still enjoyable.",
            "Fantastic recipe. Adding it to my regular rotation!",
            "This recipe deserves 5 stars. Everything came together beautifully.",
            "A keeper! Can’t wait to make this for my next dinner party.",
            "I was hesitant at first, but it turned out amazing.",
            "Very versatile recipe! I made a vegetarian version.",
            "The prep time was longer than expected, but worth it.",
            "The instructions were confusing, but the end result was tasty.",
            "This recipe is foolproof! Turned out great even for a beginner.",
            "I’d probably tweak the ingredients a bit next time.",
            "My family devoured this in minutes. Absolutely delicious!",
            "A delightful recipe. It’s going in my favorites folder!",
            "If you’re a fan of bold flavors, this recipe is for you.",
            "Not bad, but I’d like more detailed measurements next time.",
            "Made it twice already—it’s that good!",
            "I love how it uses simple ingredients for such a fancy dish.",
            "This is great for meal prepping. Saved some for the week!",
            "Amazing! Can’t stop raving about it to my friends.",
            "Be careful not to overcook it, but otherwise, it’s perfect.",
            "The presentation was beautiful, and it tasted great too.",
            "This was a hit! Everyone at the table kept asking for the recipe.",
            "A little extra garlic and it was superb.",
            "Can’t wait to try this again with a few more spices.",
            "The proportions were just right. Great job on this recipe!",
            "A bit too sweet for my taste but otherwise nice."
    };

    private final String[] userNames = {
            "John Doe",
            "Jane Smith",
            "Michael Brown",
            "Sophia Martinez",
            "Olivia Davis",
            "James Anderson",
            "Isabella Taylor",
            "Liam Moore",
            "Emma Harris",
            "Benjamin Clark",
            "Charlotte Lewis",
            "Ethan Hall",
            "Amelia Young",
            "Mason Allen",
            "Harper Thomas",
            "Alexander Wilson",
            "Mia Scott",
            "Noah Wright",
            "Grace Rivera",
            "Ava Jenkins"
    };

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final StepRepository stepRepository;
    private final IngredientRepository ingredientRepository;
    private final CommentRepository commentRepository;
    private final RatingRepository ratingRepository;
    private final FileRepository fileRepository;

    public DataLoader(UserRepository userRepository, RecipeRepository recipeRepository, StepRepository stepRepository, IngredientRepository ingredientRepository, CommentRepository commentRepository, RatingRepository ratingRepository, FileRepository fileRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.stepRepository = stepRepository;
        this.ingredientRepository = ingredientRepository;
        this.commentRepository = commentRepository;
        this.ratingRepository = ratingRepository;
        this.fileRepository = fileRepository;
    }

    @Bean
    CommandLineRunner loadFixtures() {
        return args -> {
            // Create 20 users
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // Use bcrypt if needed for password hashing
            List<User> users = new ArrayList<>();

            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@test.com");
            admin.setPassword(encoder.encode("password"));
            admin.setBio("Bio of admin");
            admin.setMfaEnabled(false);
            admin.setRole("ROLE_ADMIN");
            users.add(admin);

            for (int i = 1; i <= 20; i++) {
                User user = new User();
                user.setName(userNames[i - 1]);
                user.setEmail("user" + i + "@test.com");
                user.setPassword(encoder.encode("password"));
                user.setBio("Bio of user n°" + i);
                user.setMfaEnabled(false);
                user.setRole("ROLE_USER");
                users.add(user);
            }

            userRepository.saveAll(users);


            // Create 50+ recipes and link to users
            List<Recipe> recipes = new ArrayList<>();

            for (int i = 0; i < 50; i++) {
                Recipe recipe = new Recipe(recipeName[i], "Description of recipe " + recipeName[i], (int) (Math.random() * 10) * 10, users.get((int) (Math.random() * users.size())));
                recipe.setPublished(true);
                recipeRepository.save(recipe);

                for (int j = 0; j < (Math.random() * 10); j++) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setName(ingredientName[(int) (Math.random() * ingredientName.length)]);
                    ingredient.setQuantity((int) (Math.random() * 10));
                    ingredient.setRecipe(recipe);
                    ingredientRepository.save(ingredient);
                }

                for (int j = 0; j < (Math.random() * 10); j++) {
                    Step step = new Step();
                    step.setTitle("Step " + (j + 1));
                    step.setDescription(cookingSteps[(int) (Math.random() * cookingSteps.length)]);
                    step.setPosition(j + 1);
                    step.setRecipe(recipe);
                    stepRepository.save(step);
                }

                for (int j = 0; j < (Math.random() * 5); j++) {
                    Rating rating = new Rating();
                    rating.setUser(users.get((int) (Math.random() * users.size())));
                    rating.setScore((int) (Math.random() * 5));
                    rating.setRecipe(recipe);
                    ratingRepository.save(rating);
                }


                for (int j = 0; j < (Math.random() * 10); j++) {
                    Comment comment = new Comment();
                    comment.setUser(users.get((int) (Math.random() * users.size())));
                    comment.setContent(recipeComments[(int) (Math.random() * recipeComments.length)]);
                    comment.setTimestamp(Date.from(new Date().toInstant().plusSeconds((long) (Math.random() * 10000))));
                    comment.setRecipe(recipe);
                    commentRepository.save(comment);
                }

                recipeRepository.save(recipe);
            }
        };
    }
}