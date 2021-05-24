import { User } from './../entities/user.entity';
import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from 'src/common/dtos/output.dto';


@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) { }

@ObjectType()
export class LoginOutput extends OutputDto {
    @Field(type => String, { nullable: true })
    token?: string;
}