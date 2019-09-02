import { Arg, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { GroupUser } from '../../entities/GroupUser';
import { List } from '../../entities/List';
import { WishItem } from '../../entities/WishItem';
import { CreateListInput } from './create/CreateListInput';

@Resolver()
export class UpsertListResolver {
    @Mutation(() => List, { description: 'This mutation will save a list in the database', })
    async upsertList(@Arg('input') { groupUserId, items }: CreateListInput): Promise<List> {
        const groupUser = await GroupUser.findOne({ where: { id: groupUserId }, relations: ['list'] });
        console.log(groupUser);
        if (!groupUser) {
            return null;
        }
        return getConnection().manager.transaction(async manager => {
            const list = groupUser.list || (await manager.save(List.create()));
            const wishItems = await manager.save(items.map(item => WishItem.create({ ...item })));
            list.wishItems = wishItems;
            groupUser.list = list;
            await manager.save([list, groupUser]);
            return list;
        });
    }
}
