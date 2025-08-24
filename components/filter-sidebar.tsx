"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

const categories = ["Sarees", "Lehengas", "Kurtas", "Salwar Suits", "Anarkalis", "Dupattas", "Blouses", "Accessories"]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const conditions = ["New with tags", "Like new", "Good", "Fair"]
const colors = ["Red", "Blue", "Green", "Pink", "Gold", "Black", "White", "Multicolor"]

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 120])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="lg:hidden">
          {isCollapsed ? "Show" : "Hide"}
        </Button>
      </div>

      <div className={`space-y-6 ${isCollapsed ? "hidden lg:block" : ""}`}>
        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <Card className="border-primary/20 bg-gradient-to-br from-orange-50/50 to-pink-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Active Filters
                <Badge variant="secondary" className="text-xs">
                  {selectedFilters.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors group"
                    onClick={() => removeFilter(filter)}
                  >
                    {filter}
                    <X className="ml-1 h-3 w-3 group-hover:text-white" />
                  </Badge>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-0 h-auto text-destructive hover:text-destructive"
                onClick={() => setSelectedFilters([])}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Price Range */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Slider value={priceRange} onValueChange={setPriceRange} max={120} step={1} className="mb-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="font-medium">${priceRange[0]}</span>
              <span className="font-medium">${priceRange[1]}</span>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={category}
                    onCheckedChange={(checked) => {
                      if (checked) addFilter(category)
                      else removeFilter(category)
                    }}
                    className="group-hover:border-primary transition-colors"
                  />
                  <label
                    htmlFor={category}
                    className="text-sm cursor-pointer group-hover:text-primary transition-colors"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Size */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm">Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedFilters.includes(size) ? "default" : "outline"}
                  size="sm"
                  className={`transition-all duration-200 ${
                    selectedFilters.includes(size)
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      : "hover:border-primary hover:text-primary"
                  }`}
                  onClick={() => {
                    if (selectedFilters.includes(size)) {
                      removeFilter(size)
                    } else {
                      addFilter(size)
                    }
                  }}
                >
                  {size}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Condition */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm">Condition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={condition}
                    onCheckedChange={(checked) => {
                      if (checked) addFilter(condition)
                      else removeFilter(condition)
                    }}
                    className="group-hover:border-primary transition-colors"
                  />
                  <label
                    htmlFor={condition}
                    className="text-sm cursor-pointer group-hover:text-primary transition-colors"
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
