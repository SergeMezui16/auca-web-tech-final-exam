import { Clock, ChefHat, StarIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, Input, Label, Textarea
} from "@/components/ui/index.js";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";

export default function RecipeDetail() {
  return (
    <article className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Delicious Pancakes</h1>
          <p className="text-gray-600 mb-4">
            Learn how to make fluffy and delicious pancakes with this easy recipe. Perfect for a weekend breakfast or
            brunch!
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600"/>
              <span>Prep: 10 mins</span>
            </div>
            <div className="flex items-center">
              <ChefHat className="w-5 h-5 mr-2 text-gray-600"/>
              <span>Difficulty: Easy</span>
            </div>
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 mr-2 text-gray-600"/>
              <span>4.7</span>
            </div>
          </div>
          <div className="flex gap-2 mb-6">
            <Badge>Breakfast</Badge>
            <Badge>Vegetarian</Badge>
          </div>
          <div className="flex gap-2">
            <Link to={"/recipes/2/edit"}><Button>
              Edit
            </Button></Link>
            <RateRecipe/>
            <PublishComment />
          </div>
        </div>
        <div>
          <img
            src="https://kzmntp3dhxrthpgsm69e.lite.vusercontent.net/placeholder.svg?height=200&width=350"
            alt="Delicious Pancakes"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-[400px]"
          />
        </div>
      </div>

      <Tabs defaultValue="ingredients" className="mt-8">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <ul className="list-disc pl-5 space-y-2">
            <li>1 1/2 cups all-purpose flour</li>
            <li>3 1/2 teaspoons baking powder</li>
            <li>1/4 teaspoon salt</li>
            <li>1 tablespoon white sugar</li>
            <li>1 1/4 cups milk</li>
            <li>1 egg</li>
            <li>3 tablespoons melted butter</li>
          </ul>
        </TabsContent>
        <TabsContent value="instructions">
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <p>In a large bowl, sift together the flour, baking powder, salt, and sugar.</p>
            </li>
            <li>
              <p>In another bowl, whisk together the milk, egg, and melted butter.</p>
            </li>
            <li>
              <p>Pour the wet ingredients into the dry ingredients and whisk until just combined. Do not overmix; the
                batter should be slightly lumpy.</p>
            </li>
            <li>
              <p>Heat a lightly oiled griddle or frying pan over medium-high heat.</p>
            </li>
            <li>
              <p>For each pancake, pour approximately 1/4 cup of batter onto the griddle.</p>
            </li>
            <li>
              <p>Cook until bubbles form on the surface and the edges start to look dry, about 2-3 minutes.</p>
            </li>
            <li>
              <p>Flip and cook the other side until golden brown, about 1-2 minutes.</p>
            </li>
            <li>
              <p>Serve hot with your favorite toppings such as maple syrup, fresh berries, or whipped cream.</p>
            </li>
          </ol>
        </TabsContent>
      </Tabs>

      <RecipeComments/>
    </article>

  );
}

const comments = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "/avatars/john-doe.png"
    },
    content: "These pancakes look delicious! I can't wait to try this recipe.",
    createdAt: new Date("2023-06-01T09:00:00")
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "/avatars/jane-smith.png"
    },
    content: "I made these for breakfast today and they were a hit with my family. Thanks for sharing!",
    createdAt: new Date("2023-06-02T10:30:00")
  }
];

const RecipeComments = () => {
  return (<section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.user.avatar} alt={comment.user.name}/>
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{comment.user.name}</h3>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(comment.createdAt, {addSuffix: true})}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PublishComment = () => {
  const {register, handleSubmit} = useForm();

  const handlePublish = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageCircleIcon className="w-4 h-4 mr-2"/>
          Leave Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a comment</DialogTitle>
          <DialogDescription>
            Fill this form to post a comment
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handlePublish)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="score">Your comment*</Label>
            <Textarea
              placeholder="Leave a comment..."
              required
              {...register("content")}
            />
          </div>
          <Button type="submit" className="w-full">
            Post Comment
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

};

const RateRecipe = () => {
  const {register, handleSubmit} = useForm();

  const handleRate = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <StarIcon className="w-4 h-4 mr-2"/>
          Rate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit a step</DialogTitle>
          <DialogDescription>
            Fill this form to edit a step.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleRate)} className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="score">Rate*</Label>
            <Input defaultValue={5} required type="number" max={5} min={0}
                   id="score" {...register("score", {valueAsNumber: true})}/>
          </div>
          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

