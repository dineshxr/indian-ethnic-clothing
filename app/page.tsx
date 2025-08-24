import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 hidden lg:block">
            <FilterSidebar />
          </aside>
          <main className="flex-1">
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
