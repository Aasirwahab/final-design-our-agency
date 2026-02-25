import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Allow inline styles — needed for dynamic/computed values (e.g. mouse-position gradients)
  // that cannot be expressed in static CSS files.
  {
    rules: {
      "react/forbid-component-props": "off",
    },
  },
]);

export default eslintConfig;
