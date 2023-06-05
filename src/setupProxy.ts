export const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app: any) {
    app.use(
        "/api", // 첫 번째 Path (endpoint)
        createProxyMiddleware({
            target: "http://52.79.149.32:8080",
            changeOrigin: true,
        })
    );
};

module.exports = function (app: any) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3002/"
        })
    );
};

