import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">RecipeHub</h3>
            <p className="text-sm text-gray-600">Discover, create, and share delicious recipes from around the world.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/breakfast" className="text-sm text-gray-600 hover:text-gray-900">Breakfast</Link></li>
              <li><Link to="/category/lunch" className="text-sm text-gray-600 hover:text-gray-900">Lunch</Link></li>
              <li><Link to="/category/dinner" className="text-sm text-gray-600 hover:text-gray-900">Dinner</Link></li>
              <li><Link to="/category/desserts" className="text-sm text-gray-600 hover:text-gray-900">Desserts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">&copy; 2024 RecipeHub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

