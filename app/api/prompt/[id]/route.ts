import Prompt from '@/models/prompt';
import { connectToDB } from "@/utils/database";
// GET (read)

export const GET = async (req: Request, {params}: any) => {
    try {
        await connectToDB();

        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts) return Response.json("Prompt not found")

        return Response.json(JSON.stringify(prompts))
    } catch (error) {
        return Response.json(error)
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

        return Response.json(JSON.stringify(existingPrompt))

    } catch (error) {
        return Response.json('Failed to updata prompt')
    }
}

// DELETE (delete)
export const DELETE = async (req: Request, {params}: any) => {
    try {
        await Prompt.findByIdAndRemove(params.id)

        return Response.json("Promps delete successfully")

    } catch (error) {
        return Response.json("Failded to delete promps")
        
    }
}

// PATCH (like)
export const PUT = async (req: Request, {params}: any) => {
    const {like} = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return Response.json('like not found')

        existingPrompt.like = like + 1;

        await existingPrompt.save();

        return Response.json(JSON.stringify(existingPrompt))

    } catch (error) {
        return Response.json('Failed to updata like')
    }
}



