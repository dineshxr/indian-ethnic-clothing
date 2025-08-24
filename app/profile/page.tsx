"use client"

import { useState } from "react"
import { Camera, Edit, MapPin, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    bio: "Fashion enthusiast who loves traditional Indian wear. Always looking for unique pieces to add to my collection.",
    location: "Mumbai, Maharashtra",
    joinDate: "January 2024",
  })

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Please sign in</h1>
          <p className="text-muted-foreground">You need to be logged in to view your profile</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{profileData.name}</h1>
                      <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{profileData.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {user.isSeller && <Badge className="bg-gradient-to-r from-orange-500 to-pink-500">Seller</Badge>}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{profileData.bio}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{profileData.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Content */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>Track your recent purchases and order status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock order data */}
                    {[
                      {
                        id: "EB123456",
                        date: "Jan 15, 2024",
                        status: "Delivered",
                        total: 4500,
                        items: [
                          {
                            name: "Elegant Banarasi Silk Saree",
                            image: "/beautiful-red-banarasi-silk-saree-with-gold-border.png",
                            seller: "Priya's Collection",
                          },
                        ],
                      },
                      {
                        id: "EB123457",
                        date: "Jan 12, 2024",
                        status: "Shipped",
                        total: 8500,
                        items: [
                          {
                            name: "Designer Lehenga Choli Set",
                            image: "/stunning-pink-and-gold-lehenga-choli-with-heavy-em.png",
                            seller: "Royal Threads",
                          },
                        ],
                      },
                      {
                        id: "EB123458",
                        date: "Jan 10, 2024",
                        status: "Processing",
                        total: 1200,
                        items: [
                          {
                            name: "Cotton Anarkali Kurta",
                            image: "/elegant-blue-cotton-anarkali-kurta-with-white-dupa.png",
                            seller: "Ethnic Vibes",
                          },
                        ],
                      },
                    ].map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : order.status === "Shipped"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                            <p className="font-semibold mt-1">${Math.round(order.total / 83)}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">by {item.seller}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Details
                          </Button>
                          {order.status === "Delivered" && (
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Write Review
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mock wishlist items */}
                    {[
                      {
                        id: 1,
                        name: "Georgette Party Wear Saree",
                        price: 2800,
                        image: "/glamorous-black-georgette-saree-with-sequin-work.png",
                        seller: "Glamour House",
                      },
                      {
                        id: 2,
                        name: "Embroidered Sharara Set",
                        price: 5500,
                        image: "/elegant-cream-sharara-set-with-gold-embroidery-and.png",
                        seller: "Heritage Couture",
                      },
                    ].map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-2">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">by {item.seller}</p>
                          <p className="font-semibold mt-2">${Math.round(item.price / 83)}</p>
                          <Button className="w-full mt-3 bg-gradient-to-r from-orange-500 to-pink-500">
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button onClick={handleSave} className="bg-gradient-to-r from-orange-500 to-pink-500">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <p className="mt-1 text-sm">{profileData.name}</p>
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <p className="mt-1 text-sm">{profileData.phone}</p>
                        </div>
                      </div>

                      <div>
                        <Label>Email</Label>
                        <p className="mt-1 text-sm">{profileData.email}</p>
                      </div>

                      <div>
                        <Label>Location</Label>
                        <p className="mt-1 text-sm">{profileData.location}</p>
                      </div>

                      <div>
                        <Label>Bio</Label>
                        <p className="mt-1 text-sm">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
