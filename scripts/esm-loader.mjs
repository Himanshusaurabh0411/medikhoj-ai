import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const rootDir = process.cwd();

export async function resolve(specifier, context, defaultResolve) {
  let target = specifier;

  if (target.startsWith("@/")) {
    const relPath = target.replace("@/", "src/");
    const fullPath = path.resolve(rootDir, relPath);

    if (fs.existsSync(fullPath + ".ts")) {
      return defaultResolve(pathToFileURL(fullPath + ".ts").href, context);
    }
    if (fs.existsSync(fullPath + "/index.ts")) {
      return defaultResolve(pathToFileURL(fullPath + "/index.ts").href, context);
    }
    if (fs.existsSync(fullPath)) {
      return defaultResolve(pathToFileURL(fullPath).href, context);
    }
  }

  return defaultResolve(target, context);
}
