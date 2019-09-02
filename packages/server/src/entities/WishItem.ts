import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List';

@ObjectType()
@InputType('WishItemInput')
@Entity()
export class WishItem extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string;

    @ManyToOne(type => List, list => list.wishItems, { onDelete: 'CASCADE' })
    list: List;
}
