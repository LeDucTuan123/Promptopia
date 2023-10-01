import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import { NextRequest } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: any
): Promise<Response> => {
  try {
    await connectToDB();

    const keyword = params
      ? {
          email: { $regex: params.id },
        }
      : {};

    const users: any = await User.find({ ...keyword });

    return new Response(JSON.stringify(users));
  } catch (error) {
    return new Response('Failed to fetch all users', {
      status: 500,
    });
  }
};
