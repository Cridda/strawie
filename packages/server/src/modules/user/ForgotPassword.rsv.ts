import { Arg, Mutation, Resolver } from 'type-graphql';
import { v4 } from 'uuid';
import { forgotPasswordPrefix } from '../../constants/redisPrefixes';
import { User } from '../../entities/User';
import { redis } from '../../redis';
import { sendEmail } from '../../utils/sendEmail';

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean, { description: 'This mutation will reset a users password ' })
    async forgotPassword(@Arg('email') email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('De gebruiker met dit email adres is geen bestaand email adres');
        }

        const token = v4();

        await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1 hour exp

        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

        return true;
    }
}
