import { UserService } from './../user/user.service';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { NextFunction, Request, Response } from 'express';


@Injectable()
export class jwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            console.log(token);
            try {
                const decoded = this.jwtService.verify(token.toString());
                console.log("decoded", decoded);
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const { user, ok } = await this.userService.findById(decoded['id']);
                    if (ok) {
                        req['user'] = user;
                    }
                }
            } catch (error) {
                console.error('Middleware Error', error);
            }
        }
        next();
    }
}