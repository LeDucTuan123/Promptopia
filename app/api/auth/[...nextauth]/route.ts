import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }: any): Promise<any> {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ account, profile, user, credentials }: any) {
      try {
        await connectToDB();

        //check if a user already exists
        //kiem tra nguoi dung co ton tai hay chua
        const userExists = await User.findOne({
          email: profile.email,
        });

        //if not, create a new user
        //neu chua ton tai se tao ra 1 nguoi dung moi
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
