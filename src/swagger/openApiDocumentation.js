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
  paths: {
    "/v1/resize":{
      post:{
        tags: ["Image Resize"],
        description: "Resize Image",
        operationId: "resize",
        security: [
          {
            bearerAuth: {},
          },
        ],
        requestBody: {
          content: {
            "image/png": {
              schema: {
                $ref: "#/components/schemas/Resize",
              },
            },
            "image/jpeg":{
              schema: {
                $ref: "#/components/schemas/Resize",
              },
            }
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      }
    },
    "/v1/crop":{
      post:{
        tags: ["Image Cropping"],
        description: "Crppping Image",
        operationId: "crop",
        security: [
          {
            bearerAuth: {},
          },
        ],
        requestBody: {
          content: {
            "image/png": {
              schema: {
                $ref: "#/components/schemas/Crop",
              },
            },
            "image/jpeg":{
              schema: {
                $ref: "#/components/schemas/Crop",
              },
            }
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      }
    },
    "/v1/rotate":{
      post:{
        tags: ["Image Rotation"],
        description: "Rotate Image",
        operationId: "rotate",
        security: [
          {
            bearerAuth: {},
          },
        ],
        requestBody: {
          content: {
            "image/png": {
              schema: {
                $ref: "#/components/schemas/Rotation",
              },
            },
            "image/jpeg":{
              schema: {
                $ref: "#/components/schemas/Rotation",
              },
            }
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      }
    },
  },

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
      Resize:{
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          base64: {
            type: "string",
          },
          width: {
            type: "number",
          },
          height:{
            type: "number"
          },
          format:{
            type:"string"
          }
        },
      },
      Crop:{
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          base64: {
            type: "string",
          },
          width: {
            type: "number",
          },
          height:{
            type: "number"
          },
          format:{
            type:"string"
          },
          top:{
            type:"number"
          },
          left:{
            type:"number"
          }
        },
      },
      Rotation:{
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          base64: {
            type: "string",
          },
         angle:{
           type:"number"
         },
         format:{
          type:"string"
         }
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
