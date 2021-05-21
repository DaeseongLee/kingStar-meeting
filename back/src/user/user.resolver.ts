import { CreateAccountOutput, CreateAccountInput } from './dtos/createAccount.dto';
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from './user.service';


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
}