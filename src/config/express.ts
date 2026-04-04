import { JwtPayload } from "../interface";

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}