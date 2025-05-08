import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // baseUrl: "http://localhost:5173", // Update this to your app's base URL
    supportFile: "cypress/support/e2e.ts", // Path to your support file
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Path to your test files
  },
});
