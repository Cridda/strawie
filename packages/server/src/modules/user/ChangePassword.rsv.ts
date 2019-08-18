import { hash } from 'bcryptjs';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { forgotPasswordPrefix } from '../../constants/redisPrefixes';
import { User } from '../../entities/User';
import { redis } from '../../redis';
import { ChangePasswordInput } from './changepassword/ChangePasswordInput';

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true, description: 'This mutation will change a users password ' })
    async changePassword(@Arg('data') { token, password }: ChangePasswordInput): Promise<User | null> {
        const prefixedToken = forgotPasswordPrefix + token;

        const userId = await redis.get(prefixedToken);
        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(prefixedToken);

        user.password = await hash(password, 12);
        await user.save();
        return user;
    }
}
