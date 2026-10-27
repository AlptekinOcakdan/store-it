// Flat-config port of .eslintrc.json (kept for reference; ESLint 9 ignores it).
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier/flat";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default defineConfig([
  // tailwind.config.ts is the unused v3 config kept for reference (next lint never linted it either)
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "tailwind.config.ts"]),
  ...nextVitals,
  ...nextTs,
  // eslint-config-standard 17 only ships an eslintrc config; its `import` plugin is already registered by next.
  ...compat.extends("standard").map((c) => {
    if (c.plugins) delete c.plugins.import;
    return c;
  }),
  tailwind.configs["flat/recommended"] || tailwind.configs.recommended,
  {
    settings: { tailwindcss: { cssConfigPath: "./app/globals.css" } },
  },
  prettier,
  {
    rules: {
      "no-undef": "off",
    },
  },
]);
