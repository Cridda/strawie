import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Group } from '../../entities/Group';
import { GroupUser } from '../../entities/GroupUser';
import { User } from '../../entities/User';

@Resolver(of => User)
export class MyGroupsResolver implements ResolverInterface<User> {
    @FieldResolver()
    async groups(@Root() user: User){
        console.log(user);
        
         // find groups for user
         const groups = await getRepository(Group)
         .createQueryBuilder('g')
         .leftJoin(GroupUser, "gu", 'gu."groupId" = g."id"')
         .where('gu."userId" = :userId', {userId: user.id})
         .getMany();
         
        return groups;
    }
}
