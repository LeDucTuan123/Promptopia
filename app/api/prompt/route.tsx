import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';
import { type NextRequest } from 'next/server';

// GET (read)
export const GET = async (
  req: NextRequest,
  { params }: any
): Promise<Response> => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate('creator');

    if (!prompts) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to Get Data', {
      status: 500,
    });
  }
};
