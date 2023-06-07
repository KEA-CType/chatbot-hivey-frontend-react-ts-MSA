export const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
    app.use(
        "/apis",
        createProxyMiddleware({
            target: "http://localhost:3002/"
        })
    );
};

module.exports = function (app: any) {
    app.use(
        "/user-service",
        createProxyMiddleware( {
            target: "http://localhost:8000",
            changeOrigin: true,
        })
    );
};

module.exports = function (app: any) {
    app.use(
        "/sform-service",
        createProxyMiddleware({
            target: "http://localhost:8000",
            changeOrigin: true,
        })
    );
};
