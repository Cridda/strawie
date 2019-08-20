import { Field, InputType } from 'type-graphql';
import { GroupUserInput } from './GroupUserInput';

@InputType()
export class CreateGroupInput {
    @Field(type => [GroupUserInput])
    usersInput: GroupUserInput[];

    @Field()
    name: string;
}
