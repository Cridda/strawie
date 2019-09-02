import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WishItem } from './WishItem';

@ObjectType()
@InputType('ListInput')
@Entity()
export class List extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name: string;

    @Field(type => [WishItem], { nullable: true })
    @OneToMany(type => WishItem, wishItem => wishItem.list, { lazy: true})
    wishItems: WishItem[];
}
