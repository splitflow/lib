import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/account/index.ts",
    "src/design/index.ts",
    "src/editor/index.ts",
    "src/orchestra/index.ts",
    "src/project/index.ts",
    "src/config/index.ts",
    "src/style/index.ts",
  ],
  dts: true,
  sourcemap: true,
  format: ["cjs", "esm"],
});
