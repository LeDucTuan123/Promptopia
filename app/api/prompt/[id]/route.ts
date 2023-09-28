import Prompt from '@/models/prompt';
import { connectToDB } from "@/utils/database";
// GET (read)

export const GET = async (req: Request, {params}: any) => {
    try {
        await connectToDB();

        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts) return new Response("Prompt not found")

        return new Response(JSON.stringify(prompts), {
                 })
    } catch (error) {
        return Response.json(error), {
                 }
    }
}

// PATCH (update)
export const PATCH = async (req: Request, {params}: any) => {
    const {prompt, tag, role} = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response('Prompt not found')

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.role = role;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt))

    } catch (error) {
        return new Response('Failed to updata prompt')
    }
}

// DELETE (delete)
export const DELETE = async (req: Request, {params}: any) => {
    try {
        await Prompt.findByIdAndRemove(params.id)

        return new Response("Promps delete successfully")

    } catch (error) {
        return new Response("Failded to delete promps")
        
    }
}

// PATCH (like)
export const PUT = async (req: Request, {params}: any) => {
    const {like} = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response('like not found')

        existingPrompt.like = like + 1;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt))

    } catch (error) {
        return new Response('Failed to updata like')
    }
}



