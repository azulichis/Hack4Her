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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Datos de ejemplo para las categorías
const categorias = [
  { id: "1", nombre: "Bebidas", icono: "wine", color: "#4CAF50" },
  { id: "2", nombre: "Snacks", icono: "fast-food", color: "#FF9800" },
  { id: "3", nombre: "Lácteos", icono: "nutrition", color: "#2196F3" },
  { id: "4", nombre: "Limpieza", icono: "sparkles", color: "#9C27B0" },
  { id: "5", nombre: "Panadería", icono: "cafe", color: "#795548" },
  { id: "6", nombre: "Carnes", icono: "restaurant", color: "#F44336" },
]

// Productos destacados
const productosDestacados = [
  {
    id: "1",
    nombre: "Coca Cola 600ml",
    precio: "$15.50",
    imagen: "/placeholder.svg?height=80&width=80",
    descuento: "10%",
  },
  {
    id: "2",
    nombre: "Sabritas Clásicas",
    precio: "$18.00",
    imagen: "/placeholder.svg?height=80&width=80",
    descuento: "15%",
  },
  {
    id: "3",
    nombre: "Leche Lala 1L",
    precio: "$22.50",
    imagen: "/placeholder.svg?height=80&width=80",
    nuevo: true,
  },
]

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("")

  const renderCategoria = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.categoriaCard, { backgroundColor: item.color }]}>
      <Ionicons name={item.icono as any} size={32} color="white" />
      <Text style={styles.categoriaNombre}>{item.nombre}</Text>
    </TouchableOpacity>
  )

  const renderProducto = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.productoCard}>
      <Image source={{ uri: item.imagen }} style={styles.productoImagen} />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoPrecio}>{item.precio}</Text>
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
        {/* Header con saludo y ubicación */}
        <View style={styles.header}>
          <View>
            <Text style={styles.saludo}>¡Hola, azulichis!</Text>
            <View style={styles.ubicacionContainer}>
              <Ionicons name="location" size={16} color="#666" />
              <Text style={styles.ubicacion}>Mi Tienda - Centro</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificacionBtn}>
            <Ionicons name="notifications" size={24} color="#f80516" />
            <View style={styles.notificacionBadge}>
              <Text style={styles.notificacionTexto}>2</Text>
            </View>
          </TouchableOpacity>
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
      </ScrollView>
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
    fontSize: 12,
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
    width: 160,
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
})
