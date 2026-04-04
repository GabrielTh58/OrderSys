import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../interface";
import jwt from "jsonwebtoken";

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "AUTHORIZATION_HEADER_NOT_FOUND" });

    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({ message: "TOKEN_NOT_FOUND" });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const { userId, email } = decoded;

        req.user = { userId, email };

        next();
    } catch (err) {
        return res.status(401).json({ message: "INVALID_OR_EXPIRED_TOKEN" });
    }
}