"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

const categories = ["Sarees", "Lehengas", "Kurtas", "Salwar Suits", "Anarkalis", "Dupattas", "Blouses", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]
const conditions = ["New with tags", "Like new", "Good", "Fair"]

export default function NewProductPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    size: "",
    condition: "",
    brand: "",
    color: "",
    fabric: "",
    occasion: "",
    stock: "1",
    originalSku: "",
    tags: [] as string[],
  })

  if (!user?.isSeller) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You need to be a seller to access this page</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For demo, we'll use placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=400&width=300&text=Product+Image+${images.length + index + 1}`,
      )
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Product listed successfully!",
      description: "Your product is now live on Anjana Boutique.",
    })

    router.push("/seller/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/seller/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/4] border-2 border-dashed border-muted rounded-lg overflow-hidden"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {images.length < 8 && (
                  <label className="aspect-[3/4] border-2 border-dashed border-muted rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload Image</p>
                    </div>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Upload up to 8 high-quality images. First image will be the main photo.
              </p>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  value={productData.title}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                  placeholder="e.g., Elegant Banarasi Silk Saree with Gold Border"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  placeholder="Describe your product in detail..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setProductData({ ...productData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={productData.brand}
                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                    placeholder="e.g., Fabindia, Biba"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="originalSku">Original Item SKU</Label>
                <Input
                  id="originalSku"
                  value={productData.originalSku}
                  onChange={(e) => setProductData({ ...productData, originalSku: e.target.value })}
                  placeholder="Enter SKU from original website"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Details */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Selling Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    placeholder="30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={productData.originalPrice}
                    onChange={(e) => setProductData({ ...productData, originalPrice: e.target.value })}
                    placeholder="48"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="size">Size *</Label>
                  <Select onValueChange={(value) => setProductData({ ...productData, size: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size.toLowerCase()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <Select onValueChange={(value) => setProductData({ ...productData, condition: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition.toLowerCase()}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="1"
                    value={productData.stock}
                    onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={productData.color}
                    onChange={(e) => setProductData({ ...productData, color: e.target.value })}
                    placeholder="e.g., Red, Blue, Multicolor"
                  />
                </div>

                <div>
                  <Label htmlFor="fabric">Fabric</Label>
                  <Input
                    id="fabric"
                    value={productData.fabric}
                    onChange={(e) => setProductData({ ...productData, fabric: e.target.value })}
                    placeholder="e.g., Silk, Cotton, Georgette"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="occasion">Occasion</Label>
                <Input
                  id="occasion"
                  value={productData.occasion}
                  onChange={(e) => setProductData({ ...productData, occasion: e.target.value })}
                  placeholder="e.g., Wedding, Party, Casual, Festival"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/seller/dashboard">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              {isSubmitting ? "Publishing..." : "Publish Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
