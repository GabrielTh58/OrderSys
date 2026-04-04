import { Router } from "express";
import { ProductsRepository } from "../adapter/ProductsRepository";
import { ProductsService } from "../service/ProductsService";
import { ProductsController } from "../controller/ProductsController";
import { prisma } from "../db/Prisma";

const router = Router()

const productsRepo = new ProductsRepository(prisma);
const productsService = new ProductsService(productsRepo);
const productsController = new ProductsController(productsService);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product 1
 *               price:
 *                 type: number
 *                 example: 10.99
 *               stock:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", (req, res) => {
    productsController.createProduct(req, res);
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", (req, res) => {
    productsController.getAllProducts(req, res);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Product not found
 */
router.get("/:id", (req, res) => {
    productsController.getProductById(req, res);
});


export default router;