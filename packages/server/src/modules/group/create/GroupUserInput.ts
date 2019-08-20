import { Field, InputType } from 'type-graphql';
import { User } from '../../../entities/User';

@InputType()
export class GroupUserInput implements Partial<User> {
    @Field()
    firstName: string;

    @Field()
    email: string;
}
