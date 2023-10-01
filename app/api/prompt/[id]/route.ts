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

// PATCH (update)
export const PATCH = async (req: NextRequest, { params }: any) => {
  const { prompt, tag, role } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.role = role;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to updata prompt', { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req: any, { params }: any) => {
  try {
    await Prompt.findByIdAndRemove(params.id);

    return new Response('Promps delete successfully', { status: 200 });
  } catch (error) {
    return new Response('Failded to delete promps', { status: 500 });
  }
};

// PATCH (like)
export const PUT = async (req: NextRequest, { params }: any) => {
  const { like } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return new Response('like not found', { status: 404 });

    existingPrompt.like = like + 1;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to updata like', { status: 500 });
  }
};
