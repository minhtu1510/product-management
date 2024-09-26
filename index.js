const express= require ("express");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const systemConfig = require("./config/system");

const databse = require("./config/database");
databse.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Flash
app.use(cookieParser("DSAFAFD"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use(methodOverride("_method"));

/* New Route to the TinyMCE Node module */
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeClient.routeClient(app);
routeAdmin.routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
