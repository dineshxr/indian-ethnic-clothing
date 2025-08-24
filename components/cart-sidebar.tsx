"use client"

import { useState } from "react"
import { X, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [loadingItems, setLoadingItems] = useState<number[]>([])

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    setLoadingItems((prev) => [...prev, itemId])
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    updateQuantity(itemId, newQuantity)
    setLoadingItems((prev) => prev.filter((id) => id !== itemId))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-orange-500 to-pink-500 animate-pulse">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4 animate-fade-in">
                <div className="relative">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                  <Sparkles className="h-6 w-6 absolute -top-1 -right-1 text-orange-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Your cart is empty</h3>
                  <p className="text-muted-foreground">Add some beautiful ethnic wear to get started!</p>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-200 animate-fade-in-stagger bg-white/50 backdrop-blur"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded hover:scale-105 transition-transform duration-200"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">by {item.seller}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">${Math.round(item.price / 83)}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.size}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={loadingItems.includes(item.id)}
                          >
                            {loadingItems.includes(item.id) ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <Minus className="h-3 w-3" />
                            )}
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={loadingItems.includes(item.id)}
                          >
                            {loadingItems.includes(item.id) ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4 bg-gradient-to-r from-orange-50/50 to-pink-50/50 rounded-lg p-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${Math.round(totalPrice / 83)}</span>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
