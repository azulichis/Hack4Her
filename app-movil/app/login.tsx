import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Login() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!permission) return <View style={styles.container}><Text>Cargando permisos...</Text></View>;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Se necesita permiso para usar la cámara.</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      alert("¡Acceso permitido! ✅");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />
      <View style={styles.bottomBox}>
        {isLoggingIn ? (
          <>
            <ActivityIndicator size="large" color="#00ffcc" />
            <Text style={styles.text}>Iniciando sesión...</Text>
          </>
        ) : (
          <Button title="Simular Reconocimiento Facial - Login" onPress={handleLogin} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  bottomBox: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "80%",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginTop: 8,
  },
});
