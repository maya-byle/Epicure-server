import restaurantController from "../../../../controllers/restaurant.controller";
import express from "express";

/**
 * @swagger
 * tags:
 *   - name: Restaurant
 *     description: Operations related to restaurants
 */
const router: express.Router = express.Router();

/**
 * @swagger
 * /restaurants/:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurant]
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get("/", restaurantController.getAllRestaurants);

/**
 * @swagger
 * /restaurants/:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       description: Restaurant data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Restaurant"
 *     responses:
 *       '200':
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Restaurant created successfully
 *               restaurant:
 *                 name: Sample Restaurant
 *                 description: Sample restaurant description
 *                 image: http://example.com/image.jpg
 *                 chef: ABC123
 *                 dishes: [DEF456, GHI789]
 *                 status: ACTIVE
 */

router.post("/", restaurantController.createRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Update a restaurant by ID
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated restaurant data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Restaurant"
 *     responses:
 *       '200':
 *         description: Restaurant updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Restaurant updated successfully
 *               restaurant:
 *                 name: Updated Restaurant
 *                 description: Updated restaurant description
 *                 image: http://example.com/updated-image.jpg
 *                 chef: XYZ789
 *                 dishes: [JKL012, MNO345]
 *                 status: ACTIVE
 */

router.put("/:id", restaurantController.updateRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Restaurant deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Restaurant deleted successfully
 *               restaurant:
 *                 name: Deleted Restaurant
 *                 description: Deleted restaurant description
 *                 image: http://example.com/deleted-image.jpg
 *                 chef: PQR345
 *                 dishes: [STU678, VWX901]
 *                 status: DELETED
 *       '404':
 *         description: Restaurant not found
 */

router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
