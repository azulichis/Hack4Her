import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Inicia sesión',
      fallbackLabel: 'Usar contraseña',
      disableDeviceFallback: false,
    });

    if (result.success) {
      router.replace('/voice-auth');
    } else {
      alert('Autenticación fallida');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/images/LogoRojo.png')} style={styles.logo} />
      {/* Correo del usuario */}
      <Text style={styles.email}>Usuario: azulichis</Text>

      {/* Texto y botón */}
      <TouchableOpacity onPress={handleBiometricAuth} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar con Face ID</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 40,
    resizeMode: 'contain',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    fontWeight: 'bold',
  },
  email: { fontSize: 16, marginBottom: 20, color: 'black' },
  button: {
    backgroundColor: '#f80516',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});
