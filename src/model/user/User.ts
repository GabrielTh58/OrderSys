import { Entity, EntityProps, Id } from "../../shared";
import { Validator } from "../../utils";

export interface UserProps extends EntityProps {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface CreateUserDTO{
    name: string;
    email: string;
    password: string;
}

export class User extends Entity<UserProps>{
    constructor(id: string, props: UserProps){
        super(id, props)
    }

    static create(dto: CreateUserDTO): User {
        const id = Id.generate()

        const validation = [
            Validator.notNullOrEmpty('NAME_IS_REQUIRED', dto.name),
            Validator.notNullOrEmpty('EMAIL_IS_REQUIRED', dto.email),
            Validator.notNullOrEmpty('PASSWORD_IS_REQUIRED', dto.password),
        ]

        const errors = validation.filter((el) => el !== null)

        if(errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        return new User(id, {
            name: dto.name,
            email: dto.email,
            password: dto.password,
            createdAt: new Date()
        });
    }        

    static restore(id: string, props: UserProps): User {
        return new User(id, props);
    }

    get name(): string { return this.props.name }
    get email(): string { return this.props.email }
    get password(): string | undefined {return this.props.password }
    get createdAt(): Date { return this.props.createdAt }
}