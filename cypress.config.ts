import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

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
          console.log("global.store", global.store);
          return global.store;
        },
      });
    },
    baseUrl: process.env.REACT_APP_API_URL,
  },
});
