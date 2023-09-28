"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import axios from "axios";
import { toast } from "react-toastify";

export interface PostType {
  prompt: string;
  tag: string;
  role: string;
}

const Post: PostType = { prompt: "", tag: "" };

export default function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  
  const [post, setPost] = useState(Post);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
      
      const getPromptDetails = async () => {
        await axios
          .get(`/api/prompt/${promptId}`)
          .then((res) => setPost({ 
            prompt: res.data.prompt, 
            tag: res.data.tag,
            role: res.data.role
        }));
      };

    if(promptId) getPromptDetails()
  }, [promptId]);

  const handleUpdatePrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found')

    try {
      await axios({
        method: "PATCH",
        url: `/api/prompt/${promptId}`,
        data: JSON.stringify({
          prompt: post.prompt,
        //   userId: session?.user.id,
          tag: post.tag,
          role: post.role
        }),
      }).then((res) => {
        if (res.data) {
          router.push("/");
        }
      });
      toast.success('Update successfully')
    } catch (error) {
      console.log(error);
      toast.error('Failed to update prompt')
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onUpdatePrompt={handleUpdatePrompt}
    />
  );
}
