// Տեղական նախադիտման սերվեր. գործարկել՝ node serve.js, բացել http://localhost:5500
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = process.env.PORT || 5500;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp3": "audio/mpeg", ".json": "application/json" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = path.normalize(path.join(root, p));
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end("404"); }
    res.writeHead(200, { "Content-Type": types[path.extname(f).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log("http://localhost:" + port));
