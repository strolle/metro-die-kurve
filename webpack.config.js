const webpack = require("webpack");

module.exports = (env, argv) => {
  const PRODUCTION = env && !!env.production;

  console.log("Building for " + (PRODUCTION ? "production" : "development") + " ...");
  console.log();

  return {
    mode: PRODUCTION ? "production" : "development",
    entry: "./src/bootstrap.tsx",
    output: {
      filename: "./zatacka.js",
    },
    devtool: PRODUCTION ? "" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".scss",
      ],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                sass: true,
                sourceMap: true,
                modules: true,
                camelCase: true,
                namedExport: true,
                localIdentName: "[local]",
              },
            },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.tsx?$/,
          loaders: [
            { loader: "babel-loader" },
            { loader: "ts-loader" },
          ],
        },
      ],
    },
    plugins: [
      new webpack.WatchIgnorePlugin([
        /scss\.d\.ts$/,
      ]),
    ],
  };
};
