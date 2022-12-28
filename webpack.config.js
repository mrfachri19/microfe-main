const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const { EnvironmentPlugin } = require("webpack");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    // fallback: { crypto: false },
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/@core/assets"),
      "@components": path.resolve(__dirname, "src/@core/components"),
      "@layouts": path.resolve(__dirname, "src/@core/layouts"),
      "@store": path.resolve(__dirname, "src/redux"),
      "@styles": path.resolve(__dirname, "src/@core/scss"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@utils": path.resolve(__dirname, "src/utility/Utils"),
      "@hooks": path.resolve(__dirname, "src/utility/hooks"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // Add this option
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["node_modules", "src/assets"],
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        exclude: /node_modules/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[hash]-[name].[ext]",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "container_diarium",
      filename: "remoteEntry.js",
      remotes: {
        // container_diarium:
        //   "container_diarium@https://diarium-react-main-test-03.apps.osh.telkom.co.id/remoteEntry.js",
        // ingenium_container:
        //   "ingenium_container@https://ingenium-container-tempsurvey.apps.osh.telkom.co.id/remoteEntry.js"
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve("./src/index.html"),
    }),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      systemvars: true,
    }),
  ],
};
