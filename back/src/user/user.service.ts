import { CreateAccountInput, CreateAccountOutput } from './dtos/createAccount.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) { }

    async createAccount(input: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const user = await this.users.findOne({ email: input.email });
            if (user) {
                return {
                    ok: false,
                    error: "This email is already exists",
                }
            }
            await this.users.save(this.users.create(input));
            return {
                ok: true
            };
        } catch (error) {
            return {
                ok: false,
                error: "Couldn't createAccount"
            }
        }
    }
}