import { OutputDto } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from '../entities/user.entity';


@InputType()
export class UserProfileInput {
    @Field(type => Number)
    userId: number;
}

@ObjectType()
export class UserProfileOutput extends OutputDto {
    @Field(type => User, { nullable: true })
    user?: User;
}