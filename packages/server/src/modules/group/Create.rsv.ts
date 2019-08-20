import { Arg, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Group } from '../../entities/Group';
import { GroupUser } from '../../entities/GroupUser';
import { User } from '../../entities/User';
import { sendEmail } from '../../utils/sendEmail';
import { CreateGroupInput } from './create/CreateGroupInput';

@Resolver()
export class CreateGroupResolver {
    @Mutation(() => Group, { description: 'This mutation will save a group in the database' })
    async createGroup(@Arg('data') { usersInput, name }: CreateGroupInput): Promise<Group> {
        // create group and add users to the group
        let savedUsers = [];

        const group = await getConnection().manager.transaction(async manager => {
            const group = await manager.save(Group.create({ name }));

            savedUsers = await manager.save(
                usersInput.map(userInput =>
                    User.create({
                        ...userInput,
                    })
                )
            );
            await manager
                .createQueryBuilder()
                .insert()
                .into(GroupUser)
                .values(
                    savedUsers.map(user => ({
                        group,
                        user,
                    }))
                )
                .execute();

            return group;
        });
        // if succeeded send invitation email to all the users

        for (const { email, id } of savedUsers) {
            // we use the groupuser id to identify a user for a certain group
            const groupUser = await GroupUser.findOne({
                where: {
                    userId: id,
                },
            });

            if (!groupUser) {
                continue;
            }
            await sendEmail(
                email,
                `Accepteer uitnodiging van '${group.name}' http://localhost:3000/groep/${group.id}/${groupUser.id}`
            );
        }
        return group;
    }
}
