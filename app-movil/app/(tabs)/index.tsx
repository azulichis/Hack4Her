"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useCart, type Product } from "../../context/CartContext"

// Datos actualizados para productos mayoristas
const categorias = [
  { id: "1", nombre: "Pedido Fácil", icono: "basket", color: "#4CAF50" },
  { id: "2", nombre: "Promos", icono: "pricetag", color: "#FF5722" },
  { id: "3", nombre: "Bebidas", icono: "wine", color: "#2196F3" },
  { id: "4", nombre: "Snacks", icono: "fast-food", color: "#FF9800" },
  { id: "5", nombre: "Lácteos", icono: "nutrition", color: "#9C27B0" },
  { id: "6", nombre: "Limpieza", icono: "sparkles", color: "#607D8B" },
  { id: "7", nombre: "Panadería", icono: "cafe", color: "#795548" },
  { id: "8", nombre: "Carnes", icono: "restaurant", color: "#F44336" },
]

// Productos con estructura mayorista
const productosDestacados: Product[] = [
  {
    id: "1",
    nombre: "Coca Cola Original",
    precio: 280.5,
    imagen: "/placeholder.svg?height=80&width=80",
    cantidadPiezas: 24,
    contenidoMl: 355,
    sabor: "Original",
    categoria: "Bebidas",
    descuento: "10%",
  },
  {
    id: "2",
    nombre: "Sabritas Clásicas",
    precio: 320.0,
    imagen: "/placeholder.svg?height=80&width=80",
    cantidadPiezas: 20,
    contenidoMl: 0,
    sabor: "Sal",
    categoria: "Snacks",
    descuento: "15%",
  },
  {
    id: "3",
    nombre: "Agua Ciel Natural",
    precio: 85.5,
    imagen: "/placeholder.svg?height=80&width=80",
    cantidadPiezas: 24,
    contenidoMl: 600,
    sabor: "Natural",
    categoria: "Bebidas",
    nuevo: true,
  },
  {
    id: "4",
    nombre: "Sprite Lima-Limón",
    precio: 275.0,
    imagen: "/placeholder.svg?height=80&width=80",
    cantidadPiezas: 24,
    contenidoMl: 355,
    sabor: "Lima-Limón",
    categoria: "Bebidas",
  },
]

// Estado del pedido más reciente
const pedidoReciente = {
  numero: "#001237",
  estado: "En tránsito",
  fechaEntrega: "Lunes 16 de Diciembre",
  progreso: 75,
}

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [cantidadPaquetes, setCantidadPaquetes] = useState(1)

  const { addToCart, getTotalItems, getCartTotal } = useCart()

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product)
    setCantidadPaquetes(1)
    setModalVisible(true)
  }

  const handleAddToCart = () => {
    if (selectedProduct) {
      console.log("Agregando al carrito:", selectedProduct.nombre, "Cantidad:", cantidadPaquetes)
      addToCart(selectedProduct, cantidadPaquetes)
      console.log("Total items después de agregar:", getTotalItems())
      setModalVisible(false)
      setSelectedProduct(null)
    }
  }

  const handleSupportCall = () => {
    Alert.alert("Soporte Técnico", "¿Cómo te gustaría contactarnos?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Llamar",
        onPress: () => {
          // En React Native real, usarías: Linking.openURL('tel:+525512345678')
          Alert.alert("Llamando...", "Conectando con soporte: +52 55 1234-5678")
        },
      },
      {
        text: "WhatsApp",
        onPress: () => {
          // En React Native real, usarías: Linking.openURL('whatsapp://send?phone=525512345678&text=Hola, necesito ayuda con mi pedido')
          Alert.alert("WhatsApp", "Abriendo chat de soporte...")
        },
      },
    ])
  }

  const renderCategoria = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.categoriaCard, { backgroundColor: item.color }]}>
      <Ionicons name={item.icono as any} size={32} color="white" />
      <Text style={styles.categoriaNombre}>{item.nombre}</Text>
    </TouchableOpacity>
  )

  const renderProducto = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productoCard} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.imagen }} style={styles.productoImagen} />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoDetalles}>
          {item.cantidadPiezas} pzs {item.contenidoMl > 0 ? `• ${item.contenidoMl}ml` : ""} • {item.sabor}
        </Text>
        <Text style={styles.productoPrecio}>${item.precio.toFixed(2)}</Text>
        {item.descuento && (
          <View style={styles.descuentoBadge}>
            <Text style={styles.descuentoTexto}>-{item.descuento}</Text>
          </View>
        )}
        {item.nuevo && (
          <View style={styles.nuevoBadge}>
            <Text style={styles.nuevoTexto}>NUEVO</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.agregarBtn}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.saludo}>¡Hola, azulichis!</Text>
            <View style={styles.ubicacionContainer}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.ubicacion}>Mi Tienda - Centro</Text>
            </View>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.soporteBtn} onPress={handleSupportCall}>
              <Ionicons name="call" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificacionBtn}>
              <Ionicons name="notifications" size={24} color="#f80516" />
              <View style={styles.notificacionBadge}>
                <Text style={styles.notificacionTexto}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seguimiento de pedido reciente */}
        <View style={styles.pedidoRecienteContainer}>
          <View style={styles.pedidoRecienteHeader}>
            <Text style={styles.pedidoRecienteTitulo}>Tu pedido {pedidoReciente.numero}</Text>
            <Text style={styles.pedidoRecienteEstado}>{pedidoReciente.estado}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${pedidoReciente.progreso}%` }]} />
            </View>
            <Text style={styles.fechaEntrega}>Llega el {pedidoReciente.fechaEntrega}</Text>
          </View>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Banner promocional */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: "/placeholder.svg?height=120&width=350" }} style={styles.banner} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitulo}>Ofertas Especiales</Text>
            <Text style={styles.bannerSubtitulo}>Hasta 30% de descuento</Text>
          </View>
        </View>

        {/* Categorías */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Categorías</Text>
          <FlatList
            data={categorias}
            renderItem={renderCategoria}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriasContainer}
          />
        </View>

        {/* Productos destacados */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionTitulo}>Productos Destacados</Text>
            <TouchableOpacity>
              <Text style={styles.verTodos}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={productosDestacados}
            renderItem={renderProducto}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productosContainer}
          />
        </View>

        {/* Accesos rápidos */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Accesos Rápidos</Text>
          <View style={styles.accesoRapidoContainer}>
            <TouchableOpacity style={styles.accesoRapidoBtn}>
              <Ionicons name="time" size={24} color="#f80516" />
              <Text style={styles.accesoRapidoTexto}>Pedido Rápido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accesoRapidoBtn}>
              <Ionicons name="repeat" size={24} color="#f80516" />
              <Text style={styles.accesoRapidoTexto}>Repetir Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accesoRapidoBtn}>
              <Ionicons name="star" size={24} color="#f80516" />
              <Text style={styles.accesoRapidoTexto}>Favoritos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Mini carrito flotante */}
      {getTotalItems() > 0 && (
        <View style={styles.miniCarrito}>
          <View style={styles.miniCarritoInfo}>
            <Text style={styles.miniCarritoItems}>{getTotalItems()} productos</Text>
            <Text style={styles.miniCarritoTotal}>${getCartTotal().toFixed(2)}</Text>
          </View>
        </View>
      )}

      {/* Modal para agregar producto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.imagen }} style={styles.modalImagen} />
                <Text style={styles.modalNombre}>{selectedProduct.nombre}</Text>
                <Text style={styles.modalDetalles}>
                  {selectedProduct.cantidadPiezas} piezas •{" "}
                  {selectedProduct.contenidoMl > 0 ? `${selectedProduct.contenidoMl}ml` : ""} • {selectedProduct.sabor}
                </Text>
                <Text style={styles.modalPrecio}>${selectedProduct.precio.toFixed(2)} por paquete</Text>

                <View style={styles.cantidadSelector}>
                  <Text style={styles.cantidadLabel}>Cantidad de paquetes:</Text>
                  <View style={styles.cantidadControles}>
                    <TouchableOpacity
                      style={styles.cantidadBtn}
                      onPress={() => setCantidadPaquetes(Math.max(1, cantidadPaquetes - 1))}
                    >
                      <Ionicons name="remove" size={20} color="#f80516" />
                    </TouchableOpacity>
                    <Text style={styles.cantidadTexto}>{cantidadPaquetes}</Text>
                    <TouchableOpacity
                      style={styles.cantidadBtn}
                      onPress={() => setCantidadPaquetes(cantidadPaquetes + 1)}
                    >
                      <Ionicons name="add" size={20} color="#f80516" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.totalUnidades}>
                  Total: {cantidadPaquetes * selectedProduct.cantidadPiezas} unidades
                </Text>

                <View style={styles.modalBotones}>
                  <TouchableOpacity style={styles.cancelarBtn} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelarTexto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.agregarCarritoBtn} onPress={handleAddToCart}>
                    <Text style={styles.agregarCarritoTexto}>Agregar al Carrito</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  saludo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  ubicacionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ubicacion: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  notificacionBtn: {
    position: "relative",
  },
  notificacionBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#f80516",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificacionTexto: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  pedidoRecienteContainer: {
    backgroundColor: "white",
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pedidoRecienteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  pedidoRecienteTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pedidoRecienteEstado: {
    fontSize: 14,
    color: "#f80516",
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  fechaEntrega: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  bannerContainer: {
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  banner: {
    width: "100%",
    height: 120,
    backgroundColor: "#f80516",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "rgba(248, 5, 22, 0.8)",
  },
  bannerTitulo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bannerSubtitulo: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  seccion: {
    marginBottom: 20,
  },
  seccionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  verTodos: {
    color: "#f80516",
    fontSize: 14,
    fontWeight: "600",
  },
  categoriasContainer: {
    paddingHorizontal: 15,
  },
  categoriaCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  categoriaNombre: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  productosContainer: {
    paddingHorizontal: 15,
  },
  productoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 5,
    width: 180,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productoImagen: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  productoInfo: {
    marginTop: 8,
    position: "relative",
  },
  productoNombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  productoDetalles: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  productoPrecio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f80516",
    marginTop: 4,
  },
  descuentoBadge: {
    position: "absolute",
    top: -8,
    right: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  descuentoTexto: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  nuevoBadge: {
    position: "absolute",
    top: -8,
    right: 0,
    backgroundColor: "#FF9800",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  nuevoTexto: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  agregarBtn: {
    backgroundColor: "#f80516",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  accesoRapidoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  accesoRapidoBtn: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accesoRapidoTexto: {
    fontSize: 12,
    color: "#333",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  miniCarrito: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#f80516",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  miniCarritoInfo: {
    flex: 1,
  },
  miniCarritoItems: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  miniCarritoTotal: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalImagen: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
  modalNombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  modalDetalles: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  modalPrecio: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f80516",
    marginBottom: 20,
  },
  cantidadSelector: {
    alignItems: "center",
    marginBottom: 16,
  },
  cantidadLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  cantidadControles: {
    flexDirection: "row",
    alignItems: "center",
  },
  cantidadBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cantidadTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: "#333",
  },
  totalUnidades: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  modalBotones: {
    flexDirection: "row",
    gap: 12,
  },
  cancelarBtn: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelarTexto: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  agregarCarritoBtn: {
    flex: 1,
    backgroundColor: "#f80516",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  agregarCarritoTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  soporteBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f8f0",
  },
})
