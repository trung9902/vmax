// Optional local preview. The website also works by opening index.html directly.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT) || 5173;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const route = pathname === "/" ? "/index.html" : pathname;
    const requested = resolve(
      root,
      `.${route === "/thiet-ke-website" ? "/thiet-ke-website.html" : route}`,
    );
    if (!requested.startsWith(root.endsWith(sep) ? root : root + sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (!(await stat(requested)).isFile()) {
      res.writeHead(404).end("Not found");
      return;
    }
    const body = await readFile(requested);
    res.writeHead(200, {
      "Content-Type": types[extname(requested)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404).end("Not found");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () =>
  console.log(`VMAX preview: http://localhost:${port}`),
);
