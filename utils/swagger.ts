import { Express, Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const router: Router = express.Router();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Epicure API Docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      schemas: {
        Restaurant: {
          type: "object",
          properties: {
            image: {
              type: "string",
              description: "URL to the restaurant image",
            },
            title: {
              type: "string",
              description: "The title of the restaurant",
            },
            subTitle: {
              type: "string",
              description: "The subTitle of the restaurant",
            },
            chef: {
              $ref: "#/components/schemas/Chef",
              description: "Reference to the associated chef",
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "DRAFT", "DELETED"],
              description: "Indicates if the restaurant is active",
            },
          },
        },
        Chef: {
          type: "object",
          properties: {
            name: { type: "string", description: "The name of the chef" },
            description: {
              type: "string",
              description: "Description of the chef",
            },
            image: {
              type: "string",
              description: "URL to the chef image",
            },
            restaurants: {
              type: "array",
              items: { $ref: "#/components/schemas/Restaurant" },
              description: "Array of restaurants associated with the chef",
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "DRAFT", "DELETED"],
              description: "Indicates if the chef is active",
            },
          },
        },
        Dish: {
          type: "object",
          properties: {
            image: {
              type: "string",
              description: "URL to the dish image",
            },
            name: { type: "string", description: "The name of the dish" },
            ingredients: {
              type: "array",
              items: { type: "string" },
              description: "Array of ingredients in the dish",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Array of tags associated with the dish",
            },
            price: { type: "number", description: "The price of the dish" },
            restaurant: {
              $ref: "#/components/schemas/Restaurant",
              description: "Reference to the associated restaurant",
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "DRAFT", "DELETED"],
              description: "Indicates if the dish is active",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Restaurant",
        description: "Operations related to restaurants",
      },
      {
        name: "Chef",
        description: "Operations related to chefs",
      },
      {
        name: "Dish",
        description: "Operations related to dishes",
      },
      {
        name: "Search",
        description: "Operations related to search",
      },
    ],
  },
  apis: [
    "routes/api/versions/endpoints/restaurants.route.ts",
    "routes/api/versions/endpoints/chefs.route.ts",
    "routes/api/versions/endpoints/dishes.route.ts",
    "routes/api/versions/endpoints/search.route.ts",
  ],
};

const specs = swaggerJsdoc(options);
router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
