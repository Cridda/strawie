import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';
import { GroupUser } from './GroupUser';
import { List } from './List';

@ObjectType()
@InputType('UserInput')
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    firstName: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    password: string;

    @Column('bool', { default: false })
    confirmed: boolean;

    @Field(type => [List], { nullable: true })
    @OneToMany(type => List, list => list.user)
    lists: List[];

    @Field(type => [Group], {nullable: true})
    @OneToMany(type => GroupUser, groupUser => groupUser.user)
    groups: Group[];
}
