import { Arg, Mutation, Resolver } from 'type-graphql';
import { Group } from '../../entities/Group';
import { GroupUser } from '../../entities/GroupUser';

@Resolver()
export class AcceptInvitationResolver {
    @Mutation(() => Group, { description: 'This mutation will confirm a user after registering' })
    async acceptInvitation(@Arg('id') id: string, @Arg('groupUserId') groupUserId: string): Promise<Group | null> {
        const groupUser = await GroupUser.findOne({ where: { id: groupUserId } });
        if (!groupUser) {
            return null;
        }
        groupUser.isActive = true;
        await groupUser.save();

        return await Group.findOne(id);
    }
}
