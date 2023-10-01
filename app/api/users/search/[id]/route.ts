import { connectToDB } from "@/utils/database"
import User from '@/models/user'
import { NextResponse } from "next/server"

export const GET = async (req: any, {params}: any) => {
    try {
        await connectToDB()

        const keyword = params ? {
          email: {$regex: params.id}
        }: {}

        const users: any = await User.find({...keyword})

        return new Response(JSON.stringify(users))
    } catch (error) {
        
    }


}