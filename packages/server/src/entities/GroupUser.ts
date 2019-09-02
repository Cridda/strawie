import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';
import { List } from './List';
import { User } from './User';

@ObjectType()
@InputType('UserGroupInput')
@Entity()
export class GroupUser extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: number;

    userId: number;
    // @Column({nullable: true})
    listId: number;
    @Column()
    groupId: number;

    @ManyToOne(type => User, user => user.groupConnections)
    user: User;

    @Field(type => Group, { nullable: true })
    @ManyToOne(type => Group, group => group.userConnections)
    group: Group;

    @Field(type => Boolean)
    @Column({ default: false })
    isActive: boolean;

    @Field(type => List, { nullable: true })
    @OneToOne(type => List)
    @JoinColumn()
    list: List;
}
