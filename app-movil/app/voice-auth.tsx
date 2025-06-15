
"use client"

import { useState, useRef } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Vibration } from "react-native"
import { Audio } from "expo-av"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

// Configuración para MongoDB (preparada para tus credenciales)


const VoiceAuthScreen = () => {
  const router = useRouter()
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const isPlayingRef = useRef(false)

  // Animaciones
  const pulseAnim = useRef(new Animated.Value(1)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation()
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const showSuccessAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  // Función para guardar audio en MongoDB
  const saveAudioToMongoDB = async (audioUri: string) => {
    try {
      // Convertir audio a base64 o usar un servicio de almacenamiento
      const audioData = {
        userId: "azulichis", // Reemplazar con ID real del usuario
        timestamp: new Date().toISOString(),
        audioUri: audioUri,
        deviceInfo: {
          platform: "mobile",
          // Agregar más info del dispositivo si es necesario
        },
        authenticationStatus: "success",
      }

      // Aquí harías la llamada a tu API que conecta con MongoDB
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_API}/api/voice-auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(audioData),
        })


      if (response.ok) {
        console.log("Audio guardado exitosamente en MongoDB")
      } else {
        console.error("Error al guardar audio en MongoDB")
      }
    } catch (error) {
      console.error("Error conectando con MongoDB:", error)
    }
  }

  const playStartSound = () => {
    Vibration.vibrate(100)
  }

  const playProcessingSound = () => {
    Vibration.vibrate([200, 100, 200])
  }

  const playSuccessSound = () => {
    Vibration.vibrate([100, 50, 100, 50, 300])
  }

  const startRecording = async () => {
    try {
      setUnlocked(false)
      setSound(null)
      setIsProcessing(false)
      fadeAnim.setValue(0)

      playStartSound()

      const { granted } = await Audio.requestPermissionsAsync()
      if (!granted) {
        alert("Permiso denegado para usar el micrófono.")
        return
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
      startPulseAnimation()

      setTimeout(() => stopRecording(recording), 3000)
    } catch (error) {
      console.error("Error al iniciar grabación:", error)
      alert("Error al iniciar la grabación")
    }
  }

  const stopRecording = async (recordingInstance: Audio.Recording) => {
    try {
      stopPulseAnimation()
      setIsProcessing(true)
      playProcessingSound()

      await recordingInstance.stopAndUnloadAsync()
      const uri = recordingInstance.getURI()

      // Guardar en MongoDB
      if (uri) {
        await saveAudioToMongoDB(uri)
      }

      const { sound } = await recordingInstance.createNewLoadedSoundAsync()
      setRecording(null)
      setSound(sound)

      setTimeout(() => {
        playSound(sound)
      }, 1500)
    } catch (error) {
      console.error("Error al detener la grabación:", error)
      setIsProcessing(false)
    }
  }

  const playSound = async (soundInstance: Audio.Sound) => {
    if (isPlayingRef.current) return
    isPlayingRef.current = true

    try {
      await soundInstance.replayAsync()
      soundInstance.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          isPlayingRef.current = false
          setIsProcessing(false)
          setUnlocked(true)
          showSuccessAnimation()
          playSuccessSound()

          setTimeout(() => {
            router.replace("/(tabs)")
          }, 3000)
        }
      })
    } catch (error) {
      console.error("Error al reproducir audio:", error)
      isPlayingRef.current = false
      setIsProcessing(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verificación de Voz</Text>
        <Text style={styles.subtitle}>Di tu primer nombre para completar la autenticación</Text>
      </View>

      <View style={styles.microphoneContainer}>
        <Animated.View style={[styles.microphoneButton, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity
            onPress={startRecording}
            disabled={!!recording || isProcessing}
            style={[
              styles.micButton,
              recording && styles.micButtonRecording,
              isProcessing && styles.micButtonProcessing,
            ]}
          >
            <Ionicons name="mic" size={40} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {recording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Grabando...</Text>
          </View>
        )}

        {isProcessing && (
          <View style={styles.processingContainer}>
            <Text style={styles.processingText}>Procesando voz...</Text>
          </View>
        )}

        {unlocked && (
          <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            <Text style={styles.successText}>¡Verificación exitosa!</Text>
            <Text style={styles.successSubtext}>Redirigiendo...</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instruction}>
          {recording ? "Habla ahora..." : isProcessing ? "Analizando tu voz..." : "Toca el micrófono y di tu nombre"}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f80516",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  microphoneContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  microphoneButton: {
    marginBottom: 40,
  },
  micButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#f80516",
    alignItems: "center",
    justifyContent: "center",
    elevation: 12,
    shadowColor: "#f80516",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  micButtonRecording: {
    backgroundColor: "#ff4757",
  },
  micButtonProcessing: {
    backgroundColor: "#ffa502",
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  recordingDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ff4757",
    marginRight: 12,
  },
  recordingText: {
    fontSize: 22,
    color: "#ff4757",
    fontWeight: "700",
  },
  processingContainer: {
    marginTop: 30,
  },
  processingText: {
    fontSize: 22,
    color: "#ffa502",
    fontWeight: "700",
    textAlign: "center",
  },
  successContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  successText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 15,
    textAlign: "center",
  },
  successSubtext: {
    fontSize: 18,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  instructionContainer: {
    paddingBottom: 60,
    paddingHorizontal: 10,
  },
  instruction: {
    fontSize: 24,
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    lineHeight: 32,
  },
})

export default VoiceAuthScreen
