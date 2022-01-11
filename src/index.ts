import http from "http";
import app from "./app";

const __PORT__ = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  server.listen(__PORT__, () => {
    console.log(`Listening on port ${__PORT__}. . .`);
  });
}
startServer();
