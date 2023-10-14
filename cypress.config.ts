import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  // projectId: "2aiq3d", // Your project ID from Cypress Cloud (optional, only used for project dashboard)
});
