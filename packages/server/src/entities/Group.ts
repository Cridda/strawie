import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupUser } from './GroupUser';

@ObjectType()
@InputType('GroupInput')
@Entity()
export class Group extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    name: string;

    @OneToMany(type => GroupUser, groupUser => groupUser.group)
    userConnections: GroupUser[];
}
