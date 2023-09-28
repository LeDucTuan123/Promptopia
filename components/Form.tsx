import { PostType } from "@/app/create-prompt/page";
import Link from "next/link";
import React from "react";

interface FormProps {
  type: string;
  post: PostType;
  setPost: any;
  submitting: boolean;
  onCreatePrompt?: (e: any) => Promise<void>;
  onUpdatePrompt?: (e: any) => Promise<void>;
}

export default function Form({
  post,
  setPost,
  submitting,
  type,
  onUpdatePrompt,
  onCreatePrompt,
}: FormProps) {
  console.log(post.role)
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={type === "create" ? onCreatePrompt : onUpdatePrompt}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <div className="flex justify-between">

            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI Prompt {""}
              <span className="font-normal">
                (#product, #webdevelopment, #idea)
              </span>
            </span>

            <div className="flex flex-row">
              <label>Role:</label>
              <select className="border-2 border-gray-200" onChange={(e) => setPost({...post, role: e.target.value})}>
              <option value='#'>Choore</option>
                <option value='Trò chơi'>Trò chơi</option>
                <option value='Văn học'>Văn học</option>
                <option value='Triếc lý'>Triếc lý</option>
                <option value='Công nghệ'>Công nghệ</option>
              </select>
            </div>

          </div>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="write your promt here..."
            required
            className="form_textarea"
            maxLength={500}
          />
          <span className="text-gray-400 text-sm">{post.prompt.length}/500</span>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {""}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
            maxLength={50}
          />
          <span className="text-gray-400 text-sm">{post.tag.length}/50</span>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
