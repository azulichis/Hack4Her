import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { saveVoiceRecording, getVoiceRecordings } from "./voice-auth";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/voice-auth", async (req: Request, res: Response) => {
  const result = await saveVoiceRecording(req.body);
  res.status(result.status).json(result.json);
});

app.get("/api/voice-auth", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: "userId parameter is required" });
  }
  const result = await getVoiceRecordings(userId);
  res.status(result.status).json(result.json);
});

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);
});

console.log("Intentando conectar a MongoDB...");
const client = new MongoClient(process.env.MONGODB_URI!);
client.connect()
  .then(() => {
    console.log("¡Conexión exitosa a MongoDB!");
    client.close();
  })
  .catch(err => {
    console.error("Error conectando a MongoDB:", err);
  });
