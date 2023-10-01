"use client";

import { PostType } from "@/types/post";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  post: PostType;
  onHandleEdit?: () => void;
  onHandleDelete?: () => void;
  onAddLike?: (item: any) => {} | void;
}

export default function PromptCard({
  post,
  onHandleDelete,
  onHandleEdit,
  onAddLike,
}: Props) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter()

  const [copied, setCopied] = useState("");

  const handleLink = () => {
    router.push(session?.user.id === post.creator._id
      ? "/profile"
      : `/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  //copy
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  console.log(session);
  return (
    <>
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"> 
              <Image
                src={`${post.creator.image}`}
                alt="user_image"
                width={40}
                height={40}
                onClick={handleLink}
                className="rounded-full object-contain"
              />
            <div className="flex-col flex">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt=""
              width={12}
              height={12}
              title="Copy"
            />
          </div>
        </div>

        <p className="my-4 font-satoshi text-sm-gray-700 overflow-hidden ">
          {post.prompt}
        </p>
        {/* asdasadsdsadsadassadś */}
        <p className="text-gray-400">{post.role}</p>
        <div className="flex justify-between">
          <p
            className="font-inter text-sm -blue_gradient w-fit"
          >
            {" "}
            {post.tag}
          </p>
          <div className="flex flex-row space-x-2">
            <span>{post.like}</span>
            <button className="border-2 px-1 hover:bg-gray-400 active:bg-slate-50 rounded-md" onClick={() => session?.user ? onAddLike?.(post): alert('Vui lòng đăng nhập để like')}>
              <Icon icon="bx:like" fontSize={20} className="hover:text-slate-50" />
            </button>
          </div>
        </div>

        {post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex justify-end gap-5 border-gray-200 border-t pt-2">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={onHandleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={onHandleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
}
