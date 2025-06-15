import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function LoginScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleLogin = () => {
    alert('✅ Rostro reconocido (simulado). ¡Bienvenido!');
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <Button title="Verificar rostro" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
