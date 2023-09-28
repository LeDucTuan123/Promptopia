'use client'

import Form from '@/components/Form'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export interface PostType {
    prompt: string;
    tag: string;
    role: string;
    like: number;
}

const Post: PostType = {prompt: '', tag: '', role: '', like: 0}

export default function CreatePrompt() {
    const {data: session} = useSession()
    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState(Post)

    const handleCreatePrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await axios({
                method: 'POST',
                url: '/api/prompt/new',
                data: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                    role: post.role,
                    like: 0,
                })
            })
            .then(res => {
                if(res.data){
                    router.push('/')
                }
            })
            toast.success('Create successfully')
            return res;
        } catch (error) {
            console.log(error)
            toast.error('failed to create prompt')
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <Form 
        type="create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        onCreatePrompt={handleCreatePrompt}
    />
  )
}
