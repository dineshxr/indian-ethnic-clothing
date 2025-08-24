"use client"

import { useState } from "react"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

const mockOrders = [
  {
    id: "EB123456",
    date: "2024-01-15",
    status: "delivered",
    total: 4500,
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
    items: [
      {
        id: 1,
        name: "Elegant Banarasi Silk Saree",
        image: "/beautiful-red-banarasi-silk-saree-with-gold-border.png",
        seller: "Priya's Collection",
        price: 4500,
        quantity: 1,
      },
    ],
  },
  {
    id: "EB123457",
    date: "2024-01-12",
    status: "shipped",
    total: 8500,
    trackingNumber: "TRK123456790",
    estimatedDelivery: "2024-01-16",
    items: [
      {
        id: 2,
        name: "Designer Lehenga Choli Set",
        image: "/stunning-pink-and-gold-lehenga-choli-with-heavy-em.png",
        seller: "Royal Threads",
        price: 8500,
        quantity: 1,
      },
    ],
  },
  {
    id: "EB123458",
    date: "2024-01-10",
    status: "processing",
    total: 3700,
    trackingNumber: null,
    estimatedDelivery: "2024-01-17",
    items: [
      {
        id: 3,
        name: "Cotton Anarkali Kurta",
        image: "/elegant-blue-cotton-anarkali-kurta-with-white-dupa.png",
        seller: "Ethnic Vibes",
        price: 1200,
        quantity: 1,
      },
      {
        id: 4,
        name: "Chanderi Silk Salwar Suit",
        image: "/beautiful-green-chanderi-silk-salwar-suit-with-dup.png",
        seller: "Silk Stories",
        price: 2500,
        quantity: 1,
      },
    ],
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Please sign in</h1>
          <p className="text-muted-foreground">You need to be logged in to view your orders</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "outline"
      case "shipped":
        return "secondary"
      case "delivered":
        return "default"
      default:
        return "outline"
    }
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab = selectedTab === "all" || order.status === selectedTab

    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your purchases</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders by ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="space-y-6">
                {filteredOrders.length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <div className="text-center space-y-4">
                        <Package className="h-16 w-16 mx-auto text-muted-foreground" />
                        <div>
                          <h3 className="text-lg font-semibold">No orders found</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "Try adjusting your search terms" : "You haven't placed any orders yet"}
                          </p>
                        </div>
                        {!searchQuery && (
                          <Button asChild>
                            <Link href="/">Start Shopping</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              Order #{order.id}
                              {getStatusIcon(order.status)}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              Placed on{" "}
                              {new Date(order.date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(order.status)} className="mb-2">
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <p className="font-semibold">${Math.round(order.total / 83)}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Order Items */}
                        <div className="space-y-4 mb-6">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium line-clamp-2">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">by {item.seller}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="font-semibold">${Math.round(item.price / 83)}</span>
                                  <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Details */}
                        <div className="border-t pt-4 space-y-2">
                          {order.trackingNumber && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Tracking Number:</span>
                              <span className="font-mono">{order.trackingNumber}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {order.status === "delivered" ? "Delivered on:" : "Expected delivery:"}
                            </span>
                            <span>
                              {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-6">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Details
                          </Button>
                          {order.status === "shipped" && (
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Track Package
                            </Button>
                          )}
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Write Review
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Download Invoice
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
