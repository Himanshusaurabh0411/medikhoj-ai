import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "src/data/indianMedicines.ts");
let content = fs.readFileSync(filePath, "utf8");

// Regular expression to find each medicine block starting with id: "med-..."
const medRegex = /id:\s*"([^"]+)"/g;
let match;
const ids = [];
while ((match = medRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

console.log(`Processing ${ids.length} medicines...`);

// For each medicine id, ensure imageUrl is present:
for (const id of ids) {
  const imageFieldStr = `imageUrl: "/medicines/${id}.svg",\n    releaseType: "immediate",`;
  // Check if imageUrl is already in this medicine
  const idBlockStart = content.indexOf(`id: "${id}"`);
  const nextIdMatch = content.indexOf(`id: "med-`, idBlockStart + 10);
  const blockEnd = nextIdMatch !== -1 ? nextIdMatch : content.length;
  const blockContent = content.substring(idBlockStart, blockEnd);

  if (!blockContent.includes("imageUrl:")) {
    // Insert after id line
    content = content.replace(`id: "${id}",`, `id: "${id}",\n    imageUrl: "/medicines/${id}.svg",\n    releaseType: "immediate",`);
  }
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully updated indianMedicines.ts with imageUrl and releaseType!");
