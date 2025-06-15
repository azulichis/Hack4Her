"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: string
  nombre: string
  precio: number
  imagen: string
  cantidadPiezas: number
  contenidoMl: number
  sabor: string
  categoria: string
  descuento?: string
  nuevo?: boolean
}

export interface CartItem extends Product {
  cantidadPaquetes: number
  totalUnidades: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, cantidadPaquetes: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, cantidadPaquetes: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getTotalItems: () => number
  getTotalPackages: () => number
  getTotalUnits: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, cantidadPaquetes: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidadPaquetes: item.cantidadPaquetes + cantidadPaquetes,
                totalUnidades: (item.cantidadPaquetes + cantidadPaquetes) * item.cantidadPiezas,
              }
            : item,
        )
      } else {
        return [
          ...prevItems,
          {
            ...product,
            cantidadPaquetes,
            totalUnidades: cantidadPaquetes * product.cantidadPiezas,
          },
        ]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, cantidadPaquetes: number) => {
    if (cantidadPaquetes <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              cantidadPaquetes,
              totalUnidades: cantidadPaquetes * item.cantidadPiezas,
            }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidadPaquetes, 0)
  }

  const getTotalItems = () => {
    return cartItems.length
  }

  const getTotalPackages = () => {
    return cartItems.reduce((total, item) => total + item.cantidadPaquetes, 0)
  }

  const getTotalUnits = () => {
    return cartItems.reduce((total, item) => total + item.totalUnidades, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getTotalItems,
        getTotalPackages,
        getTotalUnits,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
