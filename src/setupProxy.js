const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "https://api-react-app-dev.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
