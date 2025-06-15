import { Stack } from "expo-router"
import { CartProvider } from "../context/CartContext"

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="voice-auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CartProvider>
  )
}

