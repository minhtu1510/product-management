const dashboardRoute = require("./dashboard.route");

module.exports.routeAdmin = (app) => {
  app.use("/admin/dashboard", dashboardRoute);
};
