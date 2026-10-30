import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const envPath = join(projectRoot, ".env.local");
const typesOnly = process.argv.includes("--types-only");

function readLocalEnv() {
  try {
    const raw = readFileSync(envPath, "utf8");

    return Object.fromEntries(
      raw
        .split(/\r?\n/)
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const separator = line.indexOf("=");
          return [line.slice(0, separator), line.slice(separator + 1)];
        }),
    );
  } catch {
    return {};
  }
}

const localEnv = readLocalEnv();
const dbUrl = process.env.SUPABASE_DB_URL || localEnv.SUPABASE_DB_URL;

if (!dbUrl) {
  console.error(
    "Missing SUPABASE_DB_URL. Add the hosted Postgres connection string to .env.local.",
  );
  console.error("Get it from Supabase Dashboard -> Connect. Never expose it to the browser.");
  process.exit(1);
}

function runSupabase(args, options = {}) {
  return spawnSync("pnpm", ["exec", "supabase", ...args], {
    cwd: projectRoot,
    shell: process.platform === "win32",
    ...options,
  });
}

if (!typesOnly) {
  const push = runSupabase(["db", "push", "--db-url", dbUrl, "--yes"], {
    stdio: "inherit",
  });

  if (push.status !== 0) {
    process.exit(push.status ?? 1);
  }
}

const generated = runSupabase(["gen", "types", "--db-url", dbUrl, "--schema", "public"], {
  encoding: "utf8",
});

if (generated.status !== 0 || !generated.stdout) {
  console.error(generated.stderr || "Could not generate database types.");
  process.exit(generated.status ?? 1);
}

writeFileSync(join(projectRoot, "src", "types", "database.ts"), generated.stdout);
console.log("Updated src/types/database.ts");
