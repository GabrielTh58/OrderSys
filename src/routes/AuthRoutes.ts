import { Request, Response, Router } from "express";
import { AuthController } from "../controller";
import { AuthService } from "../service";
import { CryptoProviderAdapter, PrismaUserRepository } from "../adapter";
import { prisma } from "../db/Prisma";

const router = Router();

const hashPassword = new CryptoProviderAdapter();
const prismaUserRepo = new PrismaUserRepository(prisma);

// Services
const authService = new AuthService(prismaUserRepo, hashPassword);

// Controllers
const authController = new AuthController(authService);

// Routes
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: create a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@test.com
 *               password:
 *                 type: string
 *                 example: #Senha123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: johndoe@test.com
 *                 password:
 *                   type: integer
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   example: John Doe
 */
router.post("/register", (req: Request, res: Response) => {
    return authController.register(req, res);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *                type: string
 *                example: johndoe@test.com
 *              password:
 *                type: string
 *                example: #Senha123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: johndoe@test.com
 *                 password:
 *                   type: integer
 *                   example: #Senha123
 */
router.post("/login", (req: Request, res: Response) => {
    return authController.login(req, res);
});



export default router