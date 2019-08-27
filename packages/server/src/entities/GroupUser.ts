import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';
import { User } from './User';

@Entity()
export class GroupUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    userId: number;
    groupId: string;

    @ManyToOne(type => User, user => user.groups)
    user: User;

    @ManyToOne(type => Group, group => group.userConnections)
    group: Group;

    @Column({ default: false })
    isActive: boolean;
}
