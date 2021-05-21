import { OutputDto } from './../../common/dtos/output.dto';
import { InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class CreateAccountInput extends OmitType(User, ['id', 'createdAt', 'updatedAt', 'useImg']) { }

@ObjectType()
export class CreateAccountOutput extends OutputDto { }