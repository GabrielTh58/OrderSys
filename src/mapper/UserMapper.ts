import { User as PrismaUser } from "../../generated/prisma/client";
import { User } from "../model";

export class UserMapper{
    static toDomain(prismaUser: PrismaUser): User {
        return User.restore(prismaUser.id, {
            name: prismaUser.name,
            email: prismaUser.email,
            password: prismaUser.password,
            createdAt: prismaUser.createdAt
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