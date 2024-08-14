import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './components/auth/_actions';
import { signinSchema } from './lib/schema';
import argon2 from 'argon2';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // let user: User | null = null;
        const validatedFields = signinSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const existingUser = await getUserByEmail(email);

          if (!existingUser || !existingUser.hashedPassword) {
            throw new Error('ユーザーが存在しません。');
          }

          const passwordsMatch = await argon2.verify(
            existingUser.hashedPassword,
            password
          );

          const { hashedPassword, ...user } = existingUser;

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  debug: true,
});
