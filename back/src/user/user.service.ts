import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import { UserProfileOutput } from './dtos/userProfile.dto';
import { CreateAccountInput, CreateAccountOutput } from './dtos/createAccount.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

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

    async login({ email, password }: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne(
                { email },
                { select: ['id', 'password'] },
            );
            if (!user) {
                return {
                    ok: false,
                    error: "User not found",
                }
            }
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: "Wrong password",
                }
            }
            const token = this.jwtService.sign(user.id);
            return {
                ok: true,
                token,
            }
        } catch (error) {

            return {
                ok: false,
                error
            }
        }
    };

    async findById(userId: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOne(userId);
            if (!user) {
                return {
                    ok: false,
                    error: 'User not found',
                }
            }
            return {
                ok: true,
                user,
            }
        } catch (error) {
            return {
                ok: false,
                error
            }
        }

    };

    async editProfile(input: EditProfileInput): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne({ email: input.email });
            if (!user) {
                return {
                    ok: false,
                    error: 'User not found',
                }
            }
            await this.users.save({
                ...user,
                ...input,
            });
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }
}