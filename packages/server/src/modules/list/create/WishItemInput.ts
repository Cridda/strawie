import { Field, InputType } from 'type-graphql';
import { WishItem } from '../../../entities/WishItem';

@InputType()
export class WishIteminput implements Partial<WishItem> {
    @Field({nullable: true})
    id?: number; 

    @Field()
    name: string;

    @Field()
    description: string;
}
