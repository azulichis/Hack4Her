// Este archivo debe ir en tu backend o en una función serverless
// Aquí tienes la estructura básica para conectar con MongoDB

import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()


// Configuración de MongoDB - reemplaza con tus credenciales
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://azulichis:<Apb_9205>@hacks.ln1btb2.mongodb.net/?retryWrites=true&w=majority&appName=Hacks"
const DATABASE_NAME = "tuali-voice-auth"
const COLLECTION_NAME = "voice-recordings"

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables")
}


let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    if (!body.userId || !body.audioUri) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(DATABASE_NAME)
    const collection = db.collection(COLLECTION_NAME)

    // Preparar documento para insertar
    const document = {
      userId: body.userId,
      audioUri: body.audioUri,
      timestamp: new Date(),
      deviceInfo: body.deviceInfo || {},
      authenticationStatus: body.authenticationStatus || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insertar documento
    const result = await collection.insertOne(document)

    return new Response(
      JSON.stringify({
        success: true,
        insertedId: result.insertedId,
        message: "Voice recording saved successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("Error saving voice recording:", error)
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: "Failed to save voice recording",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

// Función para obtener grabaciones (opcional)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId parameter is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const client = await connectToDatabase()
    const db = client.db(DATABASE_NAME)
    const collection = db.collection(COLLECTION_NAME)

    const recordings = await collection.find({ userId }).sort({ timestamp: -1 }).limit(10).toArray()

    return new Response(JSON.stringify({ success: true, recordings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching voice recordings:", error)
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: "Failed to fetch voice recordings",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

export async function saveVoiceRecording(body: any) {
  try {
    // Validar datos requeridos
    if (!body.userId || !body.audioUri) {
      return {
        status: 400,
        json: { error: "Missing required fields" }
      }
    }

    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(DATABASE_NAME)
    const collection = db.collection(COLLECTION_NAME)

    // Preparar documento para insertar
    const document = {
      userId: body.userId,
      audioUri: body.audioUri,
      timestamp: new Date(),
      deviceInfo: body.deviceInfo || {},
      authenticationStatus: body.authenticationStatus || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insertar documento
    const result = await collection.insertOne(document)

    return {
      status: 200,
      json: {
        success: true,
        insertedId: result.insertedId,
        message: "Voice recording saved successfully",
      }
    }
  } catch (error) {
    console.error("Error saving voice recording:", error)
    return {
      status: 500,
      json: {
        error: "Internal server error",
        message: "Failed to save voice recording",
      }
    }
  }
}

export async function getVoiceRecordings(userId: string) {
  try {
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const recordings = await collection.find({ userId }).sort({ timestamp: -1 }).limit(10).toArray();

    return {
      status: 200,
      json: { success: true, recordings }
    };
  } catch (error) {
    console.error("Error fetching voice recordings:", error);
    return {
      status: 500,
      json: {
        error: "Internal server error",
        message: "Failed to fetch voice recordings"
      }
    };
  }
}