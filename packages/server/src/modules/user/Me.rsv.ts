import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entities/User';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | null> {
        const { userId } = ctx.req.session;
        if (!userId) {
            return null;
        }
        const user = await User.findOne({ where: { id: userId } });
        return user;
    }
}
