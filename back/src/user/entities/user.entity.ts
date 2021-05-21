import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { string } from "joi";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

export enum Gender {
    'Male' = 'Male',
    'Female' = 'Female'
}

registerEnumType(Gender, {
    name: 'Gender',
});

@InputType('InterestInputType', { isAbstract: true })
@ObjectType()
class Interest {
    @Field(type => String)
    name: string;
}

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Field(type => String)
    @Column()
    @IsString()
    email: string;

    @Field(type => String)
    @Column()
    @IsString()
    name: string;

    @Field(type => Gender)
    @Column()
    gender: Gender;

    @Field(type => String)
    @Column()
    @IsString()
    birth: string;

    @Field(type => String)
    @Column()
    @IsString()
    region: string;

    @Field(type => String, { nullable: true })
    @Column({ nullable: true })
    @IsString()
    useImg?: string;

    @Field(type => String, { nullable: true })
    @Column({ nullable: true })
    @IsString()
    introduce?: string;

    @Field(type => [Interest])
    @Column({ type: 'json', nullable: true })
    interestGroup: Interest[];
}