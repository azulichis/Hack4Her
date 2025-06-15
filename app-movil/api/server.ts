import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { saveVoiceRecording, getVoiceRecordings } from "./voice-auth";

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});