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
  paths: {
    "/v1/resize": {
      post: {
        tags: ["Image Resize"],
        description: "Resize Image",
        operationId: "resize",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Resize",
              },
            },
          },
          required: true,
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
      },
    },
    "/v1/crop": {
      post: {
        tags: ["Image Cropping"],
        description: "Crppping Image",
        operationId: "crop",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Crop",
              },
            },
          },
          required: true,
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
      },
    },
    "/v1/rotate": {
      post: {
        tags: ["Image Rotation"],
        description: "Rotate Image",
        operationId: "rotate",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Rotation",
              },
            },
          },
          required: true,
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
      },
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
          url: {
            type: "string",
          },
        },
      },
      Resize: {
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
          height: {
            type: "number",
          },
          format: {
            type: "string",
          },
        },
      },
      Crop: {
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
          height: {
            type: "number",
          },
          format: {
            type: "string",
          },
          top: {
            type: "number",
          },
          left: {
            type: "number",
          },
        },
      },
      Rotation: {
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          base64: {
            type: "string",
          },
          angle: {
            type: "number",
          },
          format: {
            type: "string",
          },
        },
      },
    },
  },
};

module.exports = openApiDocumentation;
