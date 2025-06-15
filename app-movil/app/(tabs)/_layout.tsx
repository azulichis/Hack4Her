import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { CartProvider, useCart } from "../../context/CartContext"

function TabsWithCart() {
  const { getTotalItems } = useCart()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f80516",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
        },
        headerStyle: {
          backgroundColor: "#f80516",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          tabBarBadge: getTotalItems() > 0 ? getTotalItems() : undefined,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default function TabLayout() {
  return (
    <CartProvider>
      <TabsWithCart />
    </CartProvider>
  )
}
