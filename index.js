const express= require ("express");

require("dotenv").config();
const app = express();
const port = process.env.PORT;
const systemConfig = require("./config/system");

const databse = require("./config/database");
databse.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeClient.routeClient(app);
routeAdmin.routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
