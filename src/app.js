const express = require("express");
const app = express();
const http = require("http");
const { PORT } = process.env;
const { DATABASE } = process.env;
const expressLayouts = require("express-ejs-layouts");
const createError = require("http-errors");
const session = require("express-session");

module.exports = class Application {
  constructor() {
    this.configServer();
    this.setupExpress();
    this.setMongoConnection();
    this.setRouters();
    this.errorHandler();
  }

  configServer() {
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  }

  setupExpress() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public"));
    app.set("view engine", config.layout.view_engine);
    app.set("views", path.resolve("./resource/views"));
    app.use(expressLayouts);
    app.set("layout extractScripts", true);
    app.set("layout extractStyles", true);
    app.set("layout", "home/master");

    app.use(
      session({
        name: "cheshmeh",
        secret: "mh4u80j70h0lsQc6retdhdtg5kUy",
        resave: false,
        saveUninitialized: false,
      })
    );
  }

  setMongoConnection() {
    mongoose.connect(DATABASE);
    mongoose.set("strictPopulate", true);
    mongoose.set("strictQuery", true);
    mongoose.connection.on("connected", () =>
      console.log(`connect to mongodb `)
    );
    mongoose.connection.on("desconnected", () =>
      console.log(`desconnect to mongodb `)
    );
  }

  setRouters() {
    app.use(AllRouters);
  }

  errorHandler() {
    app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر پیدا نشد"));
    });
    app.use((error, req, res, next) => {
      const message = error.message || "";
      const status = error.status || 404;
      return res.status(status).json({ errors: message });
    });
  }
};
