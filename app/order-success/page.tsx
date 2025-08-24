import { CheckCircle, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">Thank you for your purchase!</p>
            <p className="text-sm text-muted-foreground">
              Order ID: <span className="font-mono">#EB{Date.now().toString().slice(-6)}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Package className="h-5 w-5 text-orange-500" />
              <span>Your order is being prepared</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>Expected delivery in 3-5 business days</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/orders">View Order Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
