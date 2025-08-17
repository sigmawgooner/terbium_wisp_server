// Simple Wisp server for Terbium
import express from "express";
import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const app = express();

// Basic healthcheck
app.get("/", (req, res) => {
  res.send("✅ Wisp server running for Terbium");
});

const server = app.listen(PORT, () => {
  console.log(`Wisp server running on http://localhost:${PORT}`);
});

// WebSocket setup
const wss = new WebSocketServer({ server, path: "/wisp" });

wss.on("connection", (ws) => {
  console.log("🔌 Client connected to Wisp");

  ws.on("message", (msg) => {
    console.log("📩 Incoming:", msg.toString());
    // Echo back for now (you can expand this later)
    ws.send(`Echo: ${msg}`);
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});
