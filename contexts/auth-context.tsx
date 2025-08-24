"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isSeller: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, isSeller?: boolean) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("anjanaboutique_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        avatar: "/placeholder.svg?height=40&width=40",
        isSeller: email.includes("seller"),
      }

      setUser(mockUser)
      localStorage.setItem("anjanaboutique_user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string, isSeller = false): Promise<boolean> => {
    setIsLoading(true)

    // Mock signup - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: "/placeholder.svg?height=40&width=40",
        isSeller,
      }

      setUser(mockUser)
      localStorage.setItem("anjanaboutique_user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("anjanaboutique_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
