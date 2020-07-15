const openApiDocumentation = {
  swagger: "3.0",
  openapi: "3.0.1",
  info: {
    title: " Dockerized Image Manipulation Micro Service",
    description:
      "A Dockerized Microservice for Manipulating Images. You can crop or resize and rotate an image with just one API call. Since cropping and resizing end up with the same result (an image with altered dimensions), you can only do one at a time. Depending on the parameters passed with the call, the image either resizes or crops and/or rotates the image about an angle anti clock-wise.",
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
      name: "CRUD Operation",
    },
  ],
  paths: {
    "/v1/manipulate": {
      post: {
        tags: ["Image Resize"],
        description: "Resize Image",
        operationId: "resize",
        parameters: [
          {
            in: "query",
            name: "query",
            required: true,
            schema: {
              $ref: "#/components/schemas/Resize",
            },
          },
        ],
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
          "500": {
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
        parameters: [
          {
            in: "query",
            name: "query",
            required: true,
            schema: {
              $ref: "#/components/schemas/Crop",
            },
          },
        ],
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
          "500": {
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
        parameters: [
          {
            in: "query",
            name: "query",
            required: true,
            schema: {
              $ref: "#/components/schemas/Rotation",
            },
          },
        ],
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
          "500": {
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
