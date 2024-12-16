import { Clock, ChefHat, StarIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/index.js";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { buildLocalUrl, extractServerErrors, useFetchQuery, useMutation } from "@/hooks/use-queries.js";
import { InputNumber, InputTextarea } from "@/components/atom/input.jsx";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "@/hooks/use-account";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";

export default function RecipeDetail() {
  const {id} = useParams();
  const {account} = useAccount();
  const {data: recipe, isLoading} = useFetchQuery("/recipes/:id", {id});

  if (isLoading) return <LoadingBlock />;

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{recipe?.name}</h1>
          <p className="text-gray-600 mb-4">
            {recipe.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <ChefHat className="w-5 h-5 mr-2 text-gray-600"/>
              <span>{recipe.user.name}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600"/>
              <span>{recipe.duration} mins</span>
            </div>
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 mr-2 text-gray-600"/>
              <span>{recipe.rate.toLocaleString()}</span>
            </div>
          </div>
          {/*<div className="flex gap-2 mb-6">*/}
          {/*<Badge>Breakfast</Badge>*/}
          {/*<Badge>Vegetarian</Badge>*/}
          {/*</div>*/}
          <div className="flex gap-2">
            {recipe.user?.id === account.id && <Link to={`/recipes/${recipe.id}/edit`}><Button>
              Edit
            </Button></Link>}
            {recipe.published && <>
              <RateRecipe recipeId={id}/>
              <PublishComment recipeId={id}/>
            </>}
          </div>
        </div>
        <div>
          <img
            src={recipe?.imageUrl ? buildLocalUrl(recipe.imageUrl) : "https://kzmntp3dhxrthpgsm69e.lite.vusercontent.net/placeholder.svg?height=200&width=350"}
            alt={recipe?.name}
            width={600}
            height={300}
            className="rounded-lg object-cover w-full h-[300px]"
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
            {recipe.ingredients.map(i => (<li key={i.id}>{i.quantity} - {i.name}</li>))}
          </ul>
        </TabsContent>
        <TabsContent value="instructions">
          <div className="pl-5 flex flex-col gap-2">
            {recipe.steps.sort((a, b) => a.position - b.position).map(s => (
              <div key={s.id}>
                <h4 className="">{s.position}. <span className="font-bold">{s.title}</span></h4>
                <p className="ml-4 text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <RecipeComments recipeId={id}/>
    </article>

  );
}

const RecipeComments = ({recipeId}) => {
  const {data, isLoading} = useFetchQuery("/recipes/:id/comments", {id: recipeId});

  if (isLoading) return <LoadingBlock />;

  return (<section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {data.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.username} alt={comment.username}/>
              <AvatarFallback>{comment.username?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{comment.username ?? "unknown"}</h3>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(comment.timestamp, {addSuffix: true})}
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

const PublishComment = ({recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id/comments", {id: recipeId}, "post", ["/recipes/:id/comments"]);

  const handlePublish = (values) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Comment sent successfully.");
      },
      onError: (error) => extractServerErrors(setError, error)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <InputTextarea
            placeholder="Leave a comment..."
            required label="Your comment"
            {...register("content")}
            disabled={isPending}
            error={errors.content?.message}
          />
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

const RateRecipe = ({recipeId}) => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {mutate, isPending} = useMutation("/recipes/:id/rate", {id: recipeId}, "post", ["/recipes/:id"]);

  const handleRate = (values) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Recipe rated successfully.");
      },
      onError: (error) => {
        if (error.status === 404) {
          setOpen(false);
          return toast.error("You have already rated this recipe. You can't rate it twice.");
        }
        extractServerErrors(setError, error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <StarIcon className="w-4 h-4 mr-2"/>
          Rate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate the recipe</DialogTitle>
          <DialogDescription>
            Select your rate from 0 to 5.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleRate)} className="flex flex-col gap-4">
          <InputNumber
            disabled={isPending}
            error={errors.score?.message}
            label="Rate"
            {...register("score", {valueAsNumber: true})}
            required
            description="Leave your score over 5."
            defaultValue={5}
            max={5}
            min={0}
          />
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

