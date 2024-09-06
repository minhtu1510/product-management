const productRoute = require("./product.route");
const homeRoute = require("./home.route");

module.exports.routeClient = (app) => {
  app.get("/", (req, res) => {
    res.render("client/pages/home/index");
  });

  app.use("/products", productRoute);
};
