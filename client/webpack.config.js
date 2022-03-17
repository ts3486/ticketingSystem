const path = require("path");

module.exports = {
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
    },
  },

  output: {
    libraryTarget: "commonjs2",
  },
};
