import searchController from "../../../../controllers/search.controller";
import express from "express";

/**
 * @swagger
 * tags:
 *   - name: Search
 *     description: Operations related to search
 */
const router: express.Router = express.Router();

/**
 * @swagger
 * /search/:
 *   get:
 *     summary: Search for restaurants, chefs, and dishes by name
 *     tags: [Search]
 *     parameters:
 *       - name: input
 *         in: query
 *         description: Search query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 *                 chefs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chef'
 *                 dishes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dish'
 */
router.get("/", searchController.searchAll);

export default router;
