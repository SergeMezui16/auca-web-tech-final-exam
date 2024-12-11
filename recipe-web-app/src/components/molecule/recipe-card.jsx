import { Clock } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router";
import { buildLocalUrl } from "@/hooks/use-queries.js";

export function RecipeCard({recipe}) {
  return (
    <Card className="w-[350px] overflow-hidden">
      <img
        src={recipe.imageUrl ? buildLocalUrl(recipe.imageUrl) : "https://kzmntp3dhxrthpgsm69e.lite.vusercontent.net/placeholder.svg?height=200&width=350"}
        alt={recipe.name}
        className="w-full h-[200px] object-cover"
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{recipe.name}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4"/>
          {recipe.duration} mins
        </div>
        <Link to={`/recipes/${recipe.id}`} ><Button>Cook Now</Button></Link>
      </CardFooter>
    </Card>
  )
}

