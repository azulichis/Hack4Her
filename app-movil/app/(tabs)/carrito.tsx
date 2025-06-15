"use client"

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useCart } from "../../context/CartContext"

export default function CarritoScreen() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getTotalPackages, getTotalUnits } =
    useCart()

  console.log("Carrito - Items:", cartItems.length, cartItems)

  const envio = 45.0
  const total = getCartTotal() + envio
  const fechaEntrega = "Miércoles 18 de Diciembre"

  const handleClearCart = () => {
    Alert.alert("Vaciar Carrito", "¿Estás seguro de que quieres vaciar el carrito?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Vaciar", style: "destructive", onPress: clearCart },
    ])
  }

  const handleConfirmOrder = () => {
    Alert.alert("Confirmar Pedido", `¿Confirmas tu pedido por $${total.toFixed(2)}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: () => {
          Alert.alert("¡Pedido Confirmado!", "Tu pedido ha sido enviado exitosamente")
          clearCart()
        },
      },
    ])
  }

  const renderProducto = ({ item }: { item: any }) => (
    <View style={styles.productoCard}>
      <Image source={{ uri: item.imagen }} style={styles.productoImagen} />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoDetalles}>
          {item.cantidadPiezas} pzs • {item.contenidoMl > 0 ? `${item.contenidoMl}ml` : ""} • {item.sabor}
        </Text>
        <Text style={styles.productoPrecio}>${item.precio.toFixed(2)} c/u</Text>
        <Text style={styles.productoUnidades}>{item.totalUnidades} unidades totales</Text>
      </View>
      <View style={styles.cantidadContainer}>
        <TouchableOpacity style={styles.cantidadBtn} onPress={() => updateQuantity(item.id, item.cantidadPaquetes - 1)}>
          <Ionicons name="remove" size={16} color="#f80516" />
        </TouchableOpacity>
        <Text style={styles.cantidad}>{item.cantidadPaquetes}</Text>
        <TouchableOpacity style={styles.cantidadBtn} onPress={() => updateQuantity(item.id, item.cantidadPaquetes + 1)}>
          <Ionicons name="add" size={16} color="#f80516" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.eliminarBtn} onPress={() => removeFromCart(item.id)}>
        <Ionicons name="trash" size={16} color="#ff4757" />
      </TouchableOpacity>
    </View>
  )

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubtext}>Agrega productos para comenzar</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Información de entrega */}
        <View style={styles.entregaContainer}>
          <View style={styles.entregaHeader}>
            <Ionicons name="calendar" size={20} color="#f80516" />
            <Text style={styles.entregaTitulo}>Fecha estimada de entrega</Text>
          </View>
          <Text style={styles.fechaEntrega}>{fechaEntrega}</Text>
          <View style={styles.pagoInfo}>
            <Ionicons name="cash" size={16} color="#4CAF50" />
            <Text style={styles.pagoTexto}>Pago de contado</Text>
          </View>
        </View>

        {/* Lista de productos */}
        <View style={styles.productosSection}>
          <Text style={styles.sectionTitle}>Resumen del pedido</Text>
          <FlatList
            data={cartItems}
            renderItem={renderProducto}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Botón vaciar carrito */}
        <TouchableOpacity style={styles.vaciarBtn} onPress={handleClearCart}>
          <Ionicons name="trash-outline" size={20} color="#ff4757" />
          <Text style={styles.vaciarTexto}>Vaciar carrito</Text>
        </TouchableOpacity>

        {/* Resumen de cantidades */}
        <View style={styles.resumenCantidades}>
          <Text style={styles.resumenTitulo}>Resumen de cantidades</Text>
          <View style={styles.resumenRow}>
            <Text style={styles.resumenLabel}>Total de paquetes:</Text>
            <Text style={styles.resumenValor}>{getTotalPackages()}</Text>
          </View>
          <View style={styles.resumenRow}>
            <Text style={styles.resumenLabel}>Total de unidades:</Text>
            <Text style={styles.resumenValor}>{getTotalUnits()}</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer fijo con total y botón */}
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValor}>${getCartTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Envío:</Text>
            <Text style={styles.totalValor}>${envio.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalRow, styles.totalFinal]}>
            <Text style={styles.totalFinalLabel}>Total:</Text>
            <Text style={styles.totalFinalValor}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmarBtn} onPress={handleConfirmOrder}>
          <Text style={styles.confirmarTexto}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  entregaContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  entregaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  entregaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  fechaEntrega: {
    fontSize: 18,
    color: "#f80516",
    fontWeight: "600",
    marginBottom: 12,
  },
  pagoInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  pagoTexto: {
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 6,
    fontWeight: "600",
  },
  productosSection: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  productoCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    position: "relative",
  },
  productoImagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  productoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productoDetalles: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  productoPrecio: {
    fontSize: 14,
    color: "#f80516",
    marginTop: 4,
    fontWeight: "600",
  },
  productoUnidades: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 2,
    fontWeight: "600",
  },
  cantidadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 40,
  },
  cantidadBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cantidad: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
    color: "#333",
  },
  eliminarBtn: {
    position: "absolute",
    right: 0,
    top: 12,
    padding: 8,
  },
  vaciarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vaciarTexto: {
    fontSize: 16,
    color: "#ff4757",
    marginLeft: 8,
    fontWeight: "600",
  },
  resumenCantidades: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resumenTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  resumenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resumenLabel: {
    fontSize: 14,
    color: "#666",
  },
  resumenValor: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  footerContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  totalContainer: {
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: "#666",
  },
  totalValor: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  totalFinal: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 12,
    marginTop: 8,
  },
  totalFinalLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  totalFinalValor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f80516",
  },
  confirmarBtn: {
    backgroundColor: "#f80516",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmarTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
