import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { confirmUserPrefix } from '../../constants/redisPrefixes';
import { User } from '../../entities/User';
import { redis } from '../../redis';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean, { description: 'This mutation will confirm a user after registering' })
    async confirmUser(@Arg('token') token: string, @Ctx() ctx: MyContext): Promise<boolean> {
        const prefixedToken = confirmUserPrefix + token;
        const userId = await redis.get(prefixedToken);
        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId) }, { confirmed: true });
        await redis.del(prefixedToken);
        return true;
    }
}
