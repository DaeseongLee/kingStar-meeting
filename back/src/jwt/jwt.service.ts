import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_OPTIONS } from "src/common/common.constant";
import { JwtModuleOptions } from "./jwt.interface";

@Injectable()
export class JwtService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) { }

    sign(userId: number): string {
        return jwt.sign({ id: userId }, this.options.secretKey);
    }

    verify(token: string) {
        return jwt.verify(token, this.options.secretKey);
    }
}