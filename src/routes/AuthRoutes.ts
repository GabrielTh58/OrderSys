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
router.post("/login", (req: Request, res: Response) => {
    return authController.login(req, res);
});

router.post("/register", (req: Request, res: Response) => {
    return authController.register(req, res);
});


export default router