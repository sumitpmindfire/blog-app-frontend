import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  projectId: "1czkvj",

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        setStore: (value) => {
          global.store = value;
          return null;
        },
        getStore: () => {
          return global.store;
        },
      });
    },
    baseUrl: "https://blog-app-express.onrender.com",
    reporter: "junit",
    reporterOptions: {
      mochaFile: "results/test-output-[hash].xml",
    },
    retries: {
      openMode: 2,
    },
  },
  video: true,
});
