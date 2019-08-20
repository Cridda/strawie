import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';
import { User } from './User';

@ObjectType()
@InputType('ListInput')
@Entity()
export class List extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field(type => User)
    @ManyToOne(type => User, user => user.lists)
    user: User;

    @Field()
    @Column()
    lastName: string;

    @Field(type => Group)
    @OneToOne(type => Group)
    @JoinColumn()
    group: Group;
}
