import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const isProd = process.env.NODE_ENV === "production"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PrataUt API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: isProd
    ? ["dist/routes/*.js"] 
    : ["src/routes/*.ts"]
}

const spec = swaggerJsdoc(options)

export { spec, swaggerUi }

 