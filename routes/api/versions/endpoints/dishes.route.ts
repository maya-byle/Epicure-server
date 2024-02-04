import dishController from "../../../../controllers/dish.controller";
import express from "express";

/**
 * @swagger
 * tags:
 *   - name: Dish
 *     description: Operations related to Dishes
 */
const router: express.Router = express.Router();

/**
 * @swagger
 * /dishes/:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dish]
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             example:
 *               - name: Dish 1
 *                 price: 10.99
 *                 ingredients: ["Ingredient1", "Ingredient2"]
 *                 tags: ["Tag1", "Tag2"]
 *                 restaurant: 123
 *                 status: ACTIVE
 *               - name: Dish 2
 *                 price: 15.99
 *                 ingredients: ["Ingredient3", "Ingredient4"]
 *                 tags: ["Tag3", "Tag4"]
 *                 restaurant: 456
 *                 status: INACTIVE
 */

router.get("/", dishController.getAllDishes);

/**
 * @swagger
 * /dishes/:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dish]
 *     requestBody:
 *       description: Dish data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dish"
 *     responses:
 *       '200':
 *         description: Dish created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Dish created successfully
 *               dish:
 *                 name: New Dish
 *                 price: 20.99
 *                 ingredients: ["Ingredient5", "Ingredient6"]
 *                 tags: ["Tag5", "Tag6"]
 *                 restaurant: 789
 *                 status: ACTIVE
 */

router.post("/", dishController.createDish);

/**
 * @swagger
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish by ID
 *     tags: [Dish]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dish to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated dish data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dish"
 *     responses:
 *       '200':
 *         description: Dish updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Dish updated successfully
 *               dish:
 *                 name: Updated Dish
 *                 price: 25.99
 *                 ingredients: ["Ingredient7", "Ingredient8"]
 *                 tags: ["Tag7", "Tag8"]
 *                 restaurant: 012
 *                 status: ACTIVE
 */

router.put("/:id", dishController.updateDish);

/**
 * @swagger
 * /dishes/{id}:
 *   delete:
 *     summary: Delete a dish by ID
 *     tags: [Dish]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the dish to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Dish deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Dish deleted successfully
 *               dish:
 *                 name: Deleted Dish
 *                 price: 30.99
 *                 ingredients: ["Ingredient9", "Ingredient10"]
 *                 tags: ["Tag9", "Tag10"]
 *                 restaurant: 345
 *                 status: DELETED
 *       '404':
 *         description: Dish not found
 */

router.delete("/:id", dishController.deleteDish);

export default router;
