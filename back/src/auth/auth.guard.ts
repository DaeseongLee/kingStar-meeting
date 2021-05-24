import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "src/jwt/jwt.service";
import { UserService } from "src/user/user.service";
import { AllowRoles } from "./role.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowRoles>('roles', context.getHandler());

        // if (!roles) {
        //     return true;
        // }

        const gqlContext = GqlExecutionContext.create(context).getContext();

        return true;
    }
}