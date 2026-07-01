import { existsSync, readFileSync, readdirSync, renameSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const regionsRoot = join(process.cwd(), "public", "images", "regions");

function listDirectories(path) {
  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function listFiles(path) {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isFile())
    .sort((a, b) => a.localeCompare(b));
}

function inferExtension(path) {
  const buffer = readFileSync(path, { start: 0, end: 11 });

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return ".jpg";
  }

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return ".png";
  }

  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return ".webp";
  }

  return "";
}

function toKebab(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

const changes = [];

for (const region of listDirectories(regionsRoot)) {
  for (const group of ["budaya", "foods", "destinations"]) {
    const groupPath = join(regionsRoot, region, group);

    for (const filename of listFiles(groupPath)) {
      const currentPath = join(groupPath, filename);
      const extension = extname(filename);
      const base = extension ? filename.slice(0, -extension.length) : filename;
      const normalizedExtension = extension
        ? extension.toLowerCase()
        : inferExtension(currentPath);
      const normalizedName = `${toKebab(base)}${normalizedExtension}`;

      if (filename === normalizedName) {
        continue;
      }

      const nextPath = join(groupPath, normalizedName);

      if (existsSync(nextPath) && currentPath.toLowerCase() !== nextPath.toLowerCase()) {
        throw new Error(`Target rename sudah ada: ${nextPath}`);
      }

      if (currentPath.toLowerCase() === nextPath.toLowerCase()) {
        const temporaryPath = `${currentPath}.tmp-normalize`;
        renameSync(currentPath, temporaryPath);
        renameSync(temporaryPath, nextPath);
      } else {
        renameSync(currentPath, nextPath);
      }
      changes.push({
        from: currentPath.replace(process.cwd(), "."),
        to: nextPath.replace(process.cwd(), "."),
      });
    }
  }
}

console.log(JSON.stringify({ renamed: changes.length, changes }, null, 2));
