const cors = require("cors");
const createProxyMiddleware = require("http-proxy-middleware");
const express = require("express");
// const helmet = require("helmet");
const middlewares = require("./middlewares");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build")));

// app.use(helmet());
// app.use(
//   helmet({
//     frameguard: {
//       action: "SAMEORIGIN",
//     },
//     contentSecurityPolicy: {
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "script-src": ["self", "unsafe-inline", "partydj.gsugambit.com"],
//       },
//     },
//   })
// );

app.use(
  createProxyMiddleware("/partydj", {
    target: process.env.PARTYDJ_SERVER_DOMAIN,
    changeOrigin: true,
    logLevel: "warn",
    pathRewrite: {
      "^/partydj": "",
    },
  })
);

app.use(express.json());
app.use("/**", (req, res) => {
  req.url = "index.html";
  app.handle(req, res);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
