import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/db/postgresql';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareHashedPassword } from '@/utils/password';
import { jwtVerify, SignJWT } from 'jose';
import { createToken } from '@/utils/jwtToken';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const validPassword = await compareHashedPassword(
          password,
          user.password
        );

        if (!validPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.JWR_SECRETE,
  cookies: {
    sessionToken: {
      name: process.env.COOKIES_NAME,
      options: {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      },
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.test = 'TEST';
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.id = user.id;
        token.hasUploadedDocuments = user.hasUploadedDocuments;
        token.isCompanyVerified = user.isCompanyVerified;
        token.isEmailVerified = user.isEmailVerified;
      }

      return token;
    },

    session({ session, token }) {
      session.user.test = 'TEST';
      session.user.role = token?.role;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.id = token.id;
      session.user.hasUploadedDocuments = token.hasUploadedDocuments;
      session.user.isCompanyVerified = token.isCompanyVerified;
      session.user.isEmailVerified = token.isEmailVerified;

      return session;
    },
  },
});
