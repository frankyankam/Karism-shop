const fs = require("fs");
const path = require("path");

const directory = "./"; // point de départ
const pattern = /(?:import\s+.*\s+from\s+['"]three['"]|require\(['"]three['"]\))/;

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !["node_modules", ".git"].includes(file)) {
      scanDirectory(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (pattern.test(content)) {
        console.log(`✅ Found THREE.js import in: ${fullPath}`);
      }
    }
  }
}

scanDirectory(directory);
