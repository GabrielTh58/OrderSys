
import { User } from "../model";
import { UserRepository } from "../provider";
import { PrismaClient } from "../../generated/prisma/client";
import { UserMapper } from "../mapper/UserMapper";

export class PrismaUserRepository implements UserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(user: User): Promise<User> {
        const rawUser = UserMapper.toPrisma(user);
        
        const { id, createdAt, ...dataToUpdate } = rawUser;

        const savedPrismaUser = await this.prisma.user.upsert({
            where: { email: rawUser.email },
            update: dataToUpdate,
            create: rawUser
        });

        return UserMapper.toDomain(savedPrismaUser);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const data = await this.prisma.user.findUnique({
            where: { email }
        })

        return data ? UserMapper.toDomain(data) : null
    }

}