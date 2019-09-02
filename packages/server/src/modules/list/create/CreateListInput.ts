import { Field, InputType } from 'type-graphql';
import { WishIteminput } from './WishItemInput';

@InputType()
export class CreateListInput {
    @Field(type => [WishIteminput])
    items: WishIteminput[];

    @Field()
    groupUserId: string;
}
