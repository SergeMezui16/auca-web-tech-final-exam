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

export function RecipeCard() {
  return (
    <Card className="w-[350px] overflow-hidden">
      <img
        src="https://kzmntp3dhxrthpgsm69e.lite.vusercontent.net/placeholder.svg?height=200&width=350"
        alt="Delicious Pasta Dish"
        className="w-full h-[200px] object-cover"
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Spaghetti Carbonara</CardTitle>
            <CardDescription>A classic Italian pasta dish</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4"/>
          25 mins
        </div>
        <Link to={`/recipes/1`} ><Button>Cook Now</Button></Link>
      </CardFooter>
    </Card>
  )
}

