import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const port = 5173;
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

function isListening() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });

    socket.setTimeout(500);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

if (await isListening()) {
  console.log(`Vite is already available at http://${host}:${port}/`);
  process.exit(0);
}

const isWindows = process.platform === "win32";
const command = isWindows ? (process.env.ComSpec ?? "cmd.exe") : "npm";
const args = isWindows
  ? [
      "/d",
      "/s",
      "/c",
      `npm run dev -- --host ${host} --port ${port} --strictPort`,
    ]
  : ["run", "dev", "--", "--host", host, "--port", String(port), "--strictPort"];

const server = spawn(command, args, {
  cwd: projectRoot,
  detached: true,
  stdio: "ignore",
  windowsHide: true,
});

server.unref();
console.log(`Starting Vite at http://${host}:${port}/`);
