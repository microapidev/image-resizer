const openApiDocumentation = {
  swagger: "3.0",
  openapi: "3.0.1",
  info: {
    title: " Dockerized Image Resizing Micro Service",
    description: "A Dockerized Microservice for Resizing Images",
    contact: {
      name: "Image Resizing API",
    },
  },
  server: [
    {
      url: "http:localhost:3000",
      description: "Local Server",
    },
  ],
  tags: [
    {
      name: "CRUD Operations Routes",
    },
  ],
  security: {
    bearerAuth: {},
  },
  paths: {},

  components: {
    schemas: {
      Response: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
          data: {
            type: "object",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
    },
  },
};

module.exports = openApiDocumentation;
