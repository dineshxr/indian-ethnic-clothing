"use client"

import { useState } from "react"
import { Heart, Star, Eye, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

// Mock product data
const products = [
  {
    id: 1,
    title: "Elegant Banarasi Silk Saree",
    price: 4500,
    originalPrice: 6000,
    image: "/beautiful-red-banarasi-silk-saree-with-gold-border.png",
    seller: "Priya's Collection",
    rating: 4.8,
    reviews: 24,
    condition: "Like new",
    size: "Free Size",
    liked: false,
  },
  {
    id: 2,
    title: "Designer Lehenga Choli Set",
    price: 8500,
    originalPrice: 12000,
    image: "/stunning-pink-and-gold-lehenga-choli-with-heavy-em.png",
    seller: "Royal Threads",
    rating: 4.9,
    reviews: 18,
    condition: "New with tags",
    size: "M",
    liked: true,
  },
  {
    id: 3,
    title: "Cotton Anarkali Kurta",
    price: 1200,
    originalPrice: 1800,
    image: "/elegant-blue-cotton-anarkali-kurta-with-white-dupa.png",
    seller: "Ethnic Vibes",
    rating: 4.6,
    reviews: 32,
    condition: "Good",
    size: "L",
    liked: false,
  },
  {
    id: 4,
    title: "Chanderi Silk Salwar Suit",
    price: 3200,
    originalPrice: 4500,
    image: "/beautiful-green-chanderi-silk-salwar-suit-with-dup.png",
    seller: "Silk Stories",
    rating: 4.7,
    reviews: 15,
    condition: "Like new",
    size: "S",
    liked: false,
  },
  {
    id: 5,
    title: "Georgette Party Wear Saree",
    price: 2800,
    originalPrice: 4000,
    image: "/glamorous-black-georgette-saree-with-sequin-work.png",
    seller: "Glamour House",
    rating: 4.5,
    reviews: 28,
    condition: "Good",
    size: "Free Size",
    liked: true,
  },
  {
    id: 6,
    title: "Embroidered Sharara Set",
    price: 5500,
    originalPrice: 8000,
    image: "/elegant-cream-sharara-set-with-gold-embroidery-and.png",
    seller: "Heritage Couture",
    rating: 4.8,
    reviews: 21,
    condition: "New with tags",
    size: "M",
    liked: false,
  },
]

export function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const [likedProducts, setLikedProducts] = useState<number[]>([2, 5])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addItem } = useCart()

  const toggleLike = (productId: number) => {
    const prev = likedProducts
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )

    toast({
      title: prev.includes(productId) ? "Removed from wishlist" : "Added to wishlist",
      description: prev.includes(productId) ? "Item removed from your wishlist" : "Item saved to your wishlist",
      duration: 2000,
    })
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image || "/placeholder.svg",
      seller: product.seller,
      size: product.size,
      condition: product.condition,
    })
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with sorting */}
      <div className="flex justify-between items-center">
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold">Ethnic Wear Collection</h2>
          <p className="text-muted-foreground">{products.length} items found</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 bg-white/50 backdrop-blur">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={product.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-stagger border-0 bg-white/80 backdrop-blur"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div
                className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : "opacity-0"}`}
              >
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/90 hover:bg-white shadow-lg"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${likedProducts.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </Button>
                  <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white shadow-lg">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>

              {product.condition === "New with tags" && (
                <Badge className="absolute top-3 left-3 bg-green-500 shadow-lg animate-pulse">New</Badge>
              )}

              <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">${Math.round(product.price / 83)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${Math.round(product.originalPrice / 83)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{product.reviews} reviews</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">by {product.seller}</span>
                  <Badge variant="outline" className="text-xs border-primary/20">
                    Size {product.size}
                  </Badge>
                </div>

                <Button
                  className="w-full mt-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
