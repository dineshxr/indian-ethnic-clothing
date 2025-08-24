"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, TrendingUp, Shield, Camera, DollarSign, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function SellPage() {
  const { user } = useAuth()

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn More",
      description: "Keep up to 90% of your sales with our low commission rates",
    },
    {
      icon: Users,
      title: "Reach Millions",
      description: "Connect with fashion lovers across the country",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid safely with our buyer protection guarantee",
    },
    {
      icon: Camera,
      title: "Easy Listing",
      description: "Upload photos and list your items in minutes",
    },
  ]

  const steps = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up as a seller and complete your profile",
    },
    {
      step: "2",
      title: "List Your Items",
      description: "Upload photos and add details about your ethnic wear",
    },
    {
      step: "3",
      title: "Start Selling",
      description: "Connect with buyers and grow your fashion business",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      avatar: "/indian-woman-seller.png",
      rating: 5,
      text: "I've sold over 200 sarees on Anjana Boutique. The platform is so easy to use!",
      earnings: "$15,000+",
    },
    {
      name: "Meera Patel",
      avatar: "/indian-woman-entrepreneur.png",
      rating: 5,
      text: "Started my lehenga business here. Now I have regular customers worldwide!",
      earnings: "$25,000+",
    },
    {
      name: "Kavya Reddy",
      avatar: "/indian-woman-fashion-seller.png",
      rating: 5,
      text: "The best platform for selling authentic Indian ethnic wear. Highly recommend!",
      earnings: "$18,000+",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2">
                  Start Selling Today
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Turn Your
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    {" "}
                    Ethnic Wear{" "}
                  </span>
                  Into Income
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of sellers on Anjana Boutique and reach fashion enthusiasts who love authentic Indian
                  ethnic wear. Start your fashion business today!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  user.isSeller ? (
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Link href="/seller/products/new">
                        <Camera className="mr-2 h-5 w-5" />
                        List Your First Item
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Link href="/signup">
                        Become a Seller
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  )
                ) : (
                  <>
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Link href="/signup">
                        Start Selling Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="text-lg px-8 py-6 border-2 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200 bg-transparent"
                    >
                      <Link href="/login">Already a seller? Sign In</Link>
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-500">1M+</div>
                  <div className="text-sm text-muted-foreground">Items Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">$10M+</div>
                  <div className="text-sm text-muted-foreground">Seller Earnings</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img src="/elegant-indian-woman-in-beautiful-saree-selling-on.png" alt="Successful seller" className="rounded-2xl shadow-2xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl blur-3xl transform scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Sell on
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Anjana Boutique?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the leading marketplace for Indian ethnic wear and grow your fashion business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-white to-orange-50/30"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-orange-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">Hear from our top sellers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-white to-pink-50/30"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-green-600">Earned {testimonial.earnings}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Fashion Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful sellers and turn your passion for ethnic wear into profit
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              user.isSeller ? (
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-orange-500 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link href="/seller/dashboard">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-orange-500 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link href="/signup">
                    Become a Seller Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-orange-500 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link href="/signup">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-200 bg-transparent"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          <div className="mt-8 text-sm opacity-75">No setup fees • Low commission rates • 24/7 support</div>
        </div>
      </section>
    </div>
  )
}
