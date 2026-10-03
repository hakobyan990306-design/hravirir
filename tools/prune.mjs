// Ջնջում է հաճախորդների հրավիրատոմսերը, որոնց <meta name="hravirir-expires" content="YYYY-MM-DD"> ամսաթիվն անցել է
// node tools/prune.mjs [site-dir]   (լռելյայն՝ hravirir)
import fs from "fs";
import path from "path";
const root = process.argv[2] || "hravirir";
const today = new Date().toISOString().slice(0, 10);
const gone = [];
for (const dir of [root, path.join(root, "invites")]) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    const f = path.join(dir, name, "index.html");
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, "utf8").match(/<meta name="hravirir-expires" content="(\d{4}-\d{2}-\d{2})">/);
    if (m && m[1] < today) { fs.rmSync(path.join(dir, name), { recursive: true, force: true }); gone.push(name + " (" + m[1] + ")"); }
  }
}
console.log(gone.length ? "Ջնջված՝ " + gone.join(", ") : "Ջնջելու բան չկա");
