import { CreateUserDTO, User } from "../model";
import { UserRepository, CryptoProvider } from "../provider";
import { AppError } from "../shared/errors/AppError";

interface loginInputDTO {
  email: string;
  password: string;
}

export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashPassword: CryptoProvider,
  ) {}

  async register(dto: CreateUserDTO): Promise<User> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (user) throw new AppError("Usuário já existe.", 400);

    const newUser = User.create(dto);

    const hashedPassword = await this.hashPassword.hash(newUser.password!);
    if (!hashedPassword)
      throw new AppError("Erro ao criptografar a senha.", 500);

    newUser.updatePasswordWithHash(hashedPassword);

    await this.userRepo.save(newUser);

    return newUser;
  }

  async login(dto: loginInputDTO): Promise<User> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new AppError("Credenciais inválidas.", 401);

    const samePassword = await this.hashPassword.compare(
      dto.password,
      user.password!,
    );
    if (!samePassword) throw new AppError("Credenciais inválidas.", 401);

    return user;
  }
}
