import { Arg, Mutation, Resolver } from 'type-graphql';
import { GroupUser } from '../../entities/GroupUser';
import { List } from '../../entities/List';

@Resolver()
export class DeleteListResolver {
    @Mutation(() => Boolean, { description: 'This mutation will save a list in the database' })
    async deleteList(@Arg('listId') id: number): Promise<Boolean> {
        await GroupUser.update({ listId: id }, { list: null });
        const result = await List.delete({ id });
        return !!result.affected;
    }
}
