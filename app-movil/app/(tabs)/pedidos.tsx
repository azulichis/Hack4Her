import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native"

const pedidos = [
  {
    id: "1",
    numero: "#001234",
    fecha: "15 Dic 2024",
    estado: "Entregado",
    total: "$245.50",
    items: 8,
    color: "#4CAF50",
  },
  {
    id: "2",
    numero: "#001235",
    fecha: "14 Dic 2024",
    estado: "En camino",
    total: "$189.00",
    items: 5,
    color: "#FF9800",
  },
  {
    id: "3",
    numero: "#001236",
    fecha: "13 Dic 2024",
    estado: "Preparando",
    total: "$156.75",
    items: 3,
    color: "#2196F3",
  },
]

export default function PedidosScreen() {
  const renderPedido = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.pedidoCard}>
      <View style={styles.pedidoHeader}>
        <Text style={styles.pedidoNumero}>{item.numero}</Text>
        <View style={[styles.estadoBadge, { backgroundColor: item.color }]}>
          <Text style={styles.estadoTexto}>{item.estado}</Text>
        </View>
      </View>
      <Text style={styles.pedidoFecha}>{item.fecha}</Text>
      <View style={styles.pedidoFooter}>
        <Text style={styles.pedidoItems}>{item.items} productos</Text>
        <Text style={styles.pedidoTotal}>{item.total}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
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
  pedidoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pedidoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pedidoNumero: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  estadoBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  estadoTexto: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  pedidoFecha: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  pedidoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pedidoItems: {
    fontSize: 14,
    color: "#666",
  },
  pedidoTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f80516",
  },
})