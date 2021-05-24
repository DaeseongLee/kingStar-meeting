import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";

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
    password: string;

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

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(password: string): Promise<Boolean> {
        try {
            const ok = await bcrypt.compare(password, this.password);
            return ok;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }
}