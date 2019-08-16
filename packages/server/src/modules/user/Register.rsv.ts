import * as bcrypt from 'bcryptjs';
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entities/User';
import { createConfirmationUrl } from '../../utils/createConfirmationUrl';
import { sendEmail } from '../../utils/sendEmail';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
    @Authorized()
    @Query(() => String)
    async hello() {
        return 'Hello Worldd!';
    }

    @Mutation(() => User, { description: 'This mutation will save a user in the database ' })
    async register(@Arg('data') { email, password, firstName, lastName }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id));
        return user;
    }
}
