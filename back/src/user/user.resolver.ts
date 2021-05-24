import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import { CreateAccountOutput, CreateAccountInput } from './dtos/createAccount.dto';
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from './user.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Roles } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';


@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(returns => Boolean)
    me() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    createAccount(@Args('input') input: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.userService.createAccount(input);
    }

    @Roles('Participant')
    @Mutation(returns => LoginOutput)
    login(@Args('input') input: LoginInput): Promise<LoginOutput> {
        return this.userService.login(input);
    }

    @Mutation(returns => EditProfileOutput)
    editProfile(@AuthUser() user: User, @Args('input') input: EditProfileInput): Promise<EditProfileOutput> {
        return this.userService.editProfile(user, input);
    }
}