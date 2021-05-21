import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

export enum Gender {
    'Male' = 'Male',
    'Female' = 'Female'
}

registerEnumType(Gender, {
    name: 'Gender',
});

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

    @Field(type => String)
    @Column()
    @IsString()
    useImg?: string;

    @Field(type => String)
    @Column()
    @IsString()
    introduce?: string;

    @Field(type => [])
    @Column({ type: 'json', nullable: true })
    @IsString()
    interestGroup: [];
}