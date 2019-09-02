import { Arg, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';
import { GroupUser } from '../../entities/GroupUser';
import { User } from '../../entities/User';

@Resolver(of => User)
export class GroupConnectionsResolver implements ResolverInterface<User> {
    @FieldResolver()
    async groupConnections(@Root() user: User, @Arg('isActive', { nullable: true }) isActive?: boolean) {
        console.log(isActive);
        const where = isActive ? { user: { id: user.id }, isActive } : { user: { id: user.id } };
        return getRepository(GroupUser).find({ relations: ['list', 'group'], where }) || [];
    }
}
