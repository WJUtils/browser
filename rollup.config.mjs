import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import license from "rollup-plugin-license";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { defineConfig } from "rollup";

/** The output file */
const file = "build/~NAME~.js";

// @ts-ignore
const dev = process.env["npm_lifecycle_event"] === "dev";

const prodOnlyPlugins = [
  terser(),
  license({ banner: { content: { file: "./LICENSE.txt" } } }),
];

const devOnlyPlugins = [];

export default defineConfig({
  input: "src/index.ts",
  output: {
    file,
    format: "cjs",
  },
  plugins: [
    svelte({
      include: "src/**/*.svelte",
      preprocess: sveltePreprocess(),
      emitCss: true,
      compilerOptions: { dev },
    }),
    typescript(),
    resolve({
      browser: true,
      extensions: [".svelte", ".ts", ".js"],
      dedupe: ["svelte"],
    }),
    ...(dev ? devOnlyPlugins : prodOnlyPlugins),
  ],
});
