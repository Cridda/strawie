import * as bcrypt from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entities/User';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true, description: 'This mutation will log a user in the server' })
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
        }

        if (!user.confirmed) {
            throw new Error('Dit account is nog niet geactiveerd');
        }

        ctx.req.session.userId = user.id;

        return user;
    }
}
