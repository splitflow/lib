import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/config/index.ts",
    "src/style/index.ts",
  ],
  dts: true,
  sourcemap: true,
  format: ["cjs", "esm"],
});
