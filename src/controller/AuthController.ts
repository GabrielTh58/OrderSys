import { AuthService } from "../service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    async register(req: Request, res: Response) {
        const { email, password, name } = req.body;
        
        const user = await this.authService.register({ email, password, name });
        const token = this.generateToken(user.id);
        
        res.status(201).json({ token });
    }

    
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        
        const user = await this.authService.login({ email, password });        
        const token = this.generateToken(user.id);

        res.status(200).json({ token });
    }

    private generateToken(userId: string): string {
        return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
    }
}
