import { OutputDto } from './../../common/dtos/output.dto';
import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";


@InputType()
export class EditProfileInput extends PartialType(PickType(User, ['email', 'name', 'region', 'useImg', 'birth', 'gender'])) { };

@ObjectType()
export class EditProfileOutput extends OutputDto { }