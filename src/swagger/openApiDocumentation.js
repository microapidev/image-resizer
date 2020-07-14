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
        tags: ["Image Manipulation"],
        description: "Manipulate Image",
        operationId: "manipulate",
        requestBody: {
          content: {
            "application/json": {
              schema: {
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
                  angle: {
                    type: "number",
                  },
                },
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
          "500": {
            description: "Server Error",
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
    },
  },
};

module.exports = openApiDocumentation;
