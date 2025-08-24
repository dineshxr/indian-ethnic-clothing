"use client"

import { useState } from "react"
import { Plus, Package, TrendingUp, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

// Mock seller data
const sellerStats = {
  totalProducts: 24,
  totalSales: 156,
  totalRevenue: 234500,
  totalViews: 12400,
}

const recentOrders = [
  {
    id: "ORD001",
    customer: "Priya Sharma",
    product: "Elegant Banarasi Silk Saree",
    amount: 4500,
    status: "shipped",
    date: "2024-01-15",
  },
  {
    id: "ORD002",
    customer: "Anita Patel",
    product: "Designer Lehenga Choli Set",
    amount: 8500,
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "ORD003",
    customer: "Meera Singh",
    product: "Cotton Anarkali Kurta",
    amount: 1200,
    status: "delivered",
    date: "2024-01-13",
  },
]

const myProducts = [
  {
    id: 1,
    title: "Elegant Banarasi Silk Saree",
    price: 4500,
    stock: 3,
    views: 245,
    status: "active",
    image: "/beautiful-red-banarasi-silk-saree-with-gold-border.png",
  },
  {
    id: 2,
    title: "Designer Lehenga Choli Set",
    price: 8500,
    stock: 1,
    views: 189,
    status: "active",
    image: "/stunning-pink-and-gold-lehenga-choli-with-heavy-em.png",
  },
  {
    id: 3,
    title: "Cotton Anarkali Kurta",
    price: 1200,
    stock: 0,
    views: 156,
    status: "out_of_stock",
    image: "/elegant-blue-cotton-anarkali-kurta-with-white-dupa.png",
  },
]

export default function SellerDashboard() {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            <Link href="/seller/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerStats.totalSales}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(sellerStats.totalRevenue / 83).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {order.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{order.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${Math.round(order.amount / 83)}</p>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* My Products */}
          <Card>
            <CardHeader>
              <CardTitle>My Products</CardTitle>
              <CardDescription>Manage your product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{product.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>${Math.round(product.price / 83)}</span>
                        <span>Stock: {product.stock}</span>
                        <span>{product.views} views</span>
                      </div>
                      <Badge variant={product.status === "active" ? "default" : "secondary"} className="text-xs mt-2">
                        {product.status === "active" ? "Active" : "Out of Stock"}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
