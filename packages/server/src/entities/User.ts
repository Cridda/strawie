import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupUser } from './GroupUser';

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

    @Field(type => [GroupUser])
    @OneToMany(type => GroupUser, groupUser => groupUser.user)
    groupConnections: GroupUser[];
}
