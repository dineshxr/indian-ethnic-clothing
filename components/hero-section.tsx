import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-orange-950/20 dark:via-pink-950/20 dark:to-purple-950/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-orange-500">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Authentic Indian Fashion</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Authentic
              </span>
              Indian Fashion
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Shop pre-loved and new ethnic wear from trusted sellers. From elegant sarees to stunning lehengas, find
              your perfect traditional outfit.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-white/50 transition-all duration-200"
              >
                Sell Your Items
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in-delay">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/elegant-indian-woman-wearing-colorful-saree-with-i.png"
                  alt="Beautiful Indian ethnic wear"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg animate-float">
                <span className="text-sm font-semibold text-orange-500">✨ Premium Quality</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg animate-float-delay">
                <span className="text-sm font-semibold text-pink-500">🛡️ Trusted Sellers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
