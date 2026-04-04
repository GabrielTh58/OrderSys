import { CreateUserDTO, User } from "../model";
import { UserRepository, CryptoProvider } from "../provider";

interface loginInputDTO{
    email: string;
    password: string;
}

export class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly hashPassword: CryptoProvider 
    ) {}

    async register(dto: CreateUserDTO): Promise<User> {
        const user = await this.userRepo.findByEmail(dto.email);
        if(user) throw new Error("USER_ALREADY_EXISTS");

        const newUser = User.create(dto);

        const hashPassword = await this.hashPassword.hash(newUser.password!);
        if(!hashPassword) throw new Error("HASHING_ERROR");

        await this.userRepo.save(newUser);

        return newUser;
    }

    async login(dto: loginInputDTO): Promise<User> {
        const user = await this.userRepo.findByEmail(dto.email);
        if(!user) throw new Error("USER_NOT_FOUND");

        const samePassword = await this.hashPassword.compare(dto.password, user.password!);
        if(!samePassword) throw new Error("INVALID_PASSWORD");

        return user;
    }

    
}