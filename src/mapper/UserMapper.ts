import { User as PrismaUser } from "../../generated/prisma/client";
import { User } from "../model";

export class UserMapper{
    static toDomain(rawUser: PrismaUser): User {
        return User.restore(rawUser.id, {
            name: rawUser.name,
            email: rawUser.email,
            password: rawUser.password,
            createdAt: rawUser.createdAt
        })
    }

    static toPrisma(user: User): PrismaUser {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt
        }
    }
}