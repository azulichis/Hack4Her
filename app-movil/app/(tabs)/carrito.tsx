import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const productosCarrito = [
  {
    id: "1",
    nombre: "Coca Cola 600ml",
    precio: 15.5,
    cantidad: 2,
    imagen: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    nombre: "Sabritas Clásicas",
    precio: 18.0,
    cantidad: 1,
    imagen: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    nombre: "Leche Lala 1L",
    precio: 22.5,
    cantidad: 3,
    imagen: "/placeholder.svg?height=60&width=60",
  },
]

export default function CarritoScreen() {
  const subtotal = productosCarrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const envio = 25.0
  const total = subtotal + envio

  const renderProducto = ({ item }: { item: any }) => (
    <View style={styles.productoCard}>
      <Image source={{ uri: item.imagen }} style={styles.productoImagen} />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoPrecio}>${item.precio.toFixed(2)}</Text>
      </View>
      <View style={styles.cantidadContainer}>
        <TouchableOpacity style={styles.cantidadBtn}>
          <Ionicons name="remove" size={16} color="#f80516" />
        </TouchableOpacity>
        <Text style={styles.cantidad}>{item.cantidad}</Text>
        <TouchableOpacity style={styles.cantidadBtn}>
          <Ionicons name="add" size={16} color="#f80516" />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productosCarrito}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.resumenContainer}>
        <View style={styles.resumenRow}>
          <Text style={styles.resumenTexto}>Subtotal:</Text>
          <Text style={styles.resumenValor}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.resumenRow}>
          <Text style={styles.resumenTexto}>Envío:</Text>
          <Text style={styles.resumenValor}>${envio.toFixed(2)}</Text>
        </View>
        <View style={[styles.resumenRow, styles.totalRow]}>
          <Text style={styles.totalTexto}>Total:</Text>
          <Text style={styles.totalValor}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.pedirBtn}>
          <Text style={styles.pedirTexto}>Realizar Pedido</Text>
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
  lista: {
    padding: 20,
  },
  productoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  productoPrecio: {
    fontSize: 14,
    color: "#f80516",
    marginTop: 4,
  },
  cantidadContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  resumenContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resumenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resumenTexto: {
    fontSize: 16,
    color: "#666",
  },
  resumenValor: {
    fontSize: 16,
    color: "#333",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f80516",
  },
  pedirBtn: {
    backgroundColor: "#f80516",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  pedirTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
