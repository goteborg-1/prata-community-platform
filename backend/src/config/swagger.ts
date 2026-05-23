import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PrataUt API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"] // "scan every ts file in /routes folder"
}

const spec = swaggerJsdoc(options)

export { spec, swaggerUi }

