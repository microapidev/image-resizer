const express = require("express");
const dotenv = require("dotenv");
const routes = require("./src/routes/routes");
const openApiDocumentation = require("./src/swagger/openApiDocumentation");
const swaggerUi = require("swagger-ui-express");
const app = express();

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ parameterLimit: 50000, extended: true }));
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use("/v1", routes);

app.use("*", (req, res) => {
  res.redirect("/v1/api-docs");
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.log({
    message: error.message,
    stack: error.stack,
  });
  res.status(status).json({
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  });
});

const port = process.env.PORT || 500;
app.listen(port, () =>
  console.log(`Image Resizing API is running on port: ${port}`)
);
