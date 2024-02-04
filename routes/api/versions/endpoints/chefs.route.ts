import chefController from "../../../../controllers/chef.controller";
import express from "express";

/**
 * @swagger
 * tags:
 *   - name: Chef
 *     description: Operations related to chefs
 * basePath: /chefs
 */
const router: express.Router = express.Router();

/**
 * @swagger
 * /chefs/:
 *   get:
 *     summary: Get all chefs
 *     tags: [Chef]
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             example:
 *               - name: Chef 1
 *                 description: Sample chef description 1
 *                 image: http://example.com/chef1.jpg
 *                 restaurants: [123, 456]
 *                 status: ACTIVE
 *               - name: Chef 2
 *                 description: Sample chef description 2
 *                 image: http://example.com/chef2.jpg
 *                 restaurants: [789, 012]
 *                 status: DELETE
 */
router.get("/", chefController.getAllChefs);

/**
 * @swagger
 * /chefs/:
 *   post:
 *     summary: Create a new chef
 *     tags: [Chef]
 *     requestBody:
 *       description: Chef data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Chef"
 *     responses:
 *       '200':
 *         description: Chef created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Chef created successfully
 *               chef:
 *                 name: New Chef
 *                 description: New chef description
 *                 image: http://example.com/new-chef.jpg
 *                 restaurants: [345, 678]
 *                 status: ACTIVE
 */

router.post("/", chefController.createChef);

/**
 * @swagger
 * /chefs/{id}:
 *   put:
 *     summary: Update a chef by ID
 *     tags: [Chef]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chef to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated chef data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Chef"
 *     responses:
 *       '200':
 *         description: Chef updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Chef updated successfully
 *               chef:
 *                 name: Updated Chef
 *                 description: Updated chef description
 *                 image: http://example.com/updated-chef.jpg
 *                 restaurants: [901, 234]
 *                 status: ACTIVE
 */

router.put("/:id", chefController.updateChef);

/**
 * @swagger
 * /chefs/{id}:
 *   delete:
 *     summary: Delete a chef by ID
 *     tags: [Chef]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chef to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Chef deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Chef deleted successfully
 *               chef:
 *                 name: Deleted Chef
 *                 description: Deleted chef description
 *                 image: http://example.com/deleted-chef.jpg
 *                 restaurants: [345, 678]
 *                 status: DELETED
 *       '404':
 *         description: Chef not found
 */

router.delete("/:id", chefController.deleteChef);

export default router;
