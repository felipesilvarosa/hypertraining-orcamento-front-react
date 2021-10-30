const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		createProxyMiddleware("/orcamentos", {
			target: "http://localhost:8080/",
		})
	);
};
