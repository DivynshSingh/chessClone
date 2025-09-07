import http from "http";
import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("OK");
  } else {
    res.writeHead(200);
    res.end("Chess backend is running");
  }
});

const wss = new WebSocketServer({ server });

const gameManager = new GameManager();
wss.on("connection", (ws) => {
  gameManager.addUser(ws);
  ws.on("close", () => gameManager.removeUser(ws));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
