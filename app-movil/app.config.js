import "dotenv/config"
export default {
  "expo": {
    "name": "app-movil",
    "slug": "app-movil",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "appmovil",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "infoPlist": {
        "NSFaceIDUsageDescription": "Usamos Face ID para autenticarte de forma segura",
        "ITSAppUsesNonExemptEncryption": false
      },
      "bundleIdentifier": "com.azulichis.appmovil"
    },
    "infoPlist": {
      "NSFaceIDUsageDescription": "Usamos Face ID para autenticarte de forma segura"
    },
    "android": {
      "permissions": [
        "CAMERA",
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-camera",
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      backendUrl: process.env.EXPO_PUBLIC_BACKEND_API,
      "eas": {
        "projectId": "82ec0071-0010-4ec5-912a-b4adef3a5cad"
      }
    }
  }
}
