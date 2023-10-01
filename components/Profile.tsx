import { PostType } from "@/types/post";
import PromptCard from "./PromptCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./Loading";

interface ProfileProps {
  name: string;
  desc: string;
  data: PostType[];
  handleEdit?: (post: PostType) => Promise<void>;
  handleDelete?: (post: PostType) => Promise<void>;
}

export default function Profile({
  data,
  desc,
  name,
  handleDelete,
  handleEdit,
}: ProfileProps) {
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if(data.length > 0){
      setLoadingPage(false);
    }
  }, [data.length]);
console.log(data)
  return (
    <section className="w-full pt-14">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Propfile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {loadingPage ? (
        <Loading />
      ) : (
        <>
          {data.length !== 0 ? (
            <div className="mt-10 prompt_layout">
              {data.map((post) => (
                <PromptCard
                  key={post._id}
                  post={post}
                  onHandleEdit={() => handleEdit && handleEdit(post)}
                  onHandleDelete={() => handleDelete && handleDelete(post)}
                />
              ))}
            </div>
          ) : (
            <div className="flex-col flex-center gap-5 pt-7">
              <Image
                src="/assets/images/heo.png"
                className="object-cover"
                alt=""
                width={400}
                height={400}
              />
              <p className="text-2xl font-inter">
                Bạn chưa có bài đăng nào, vui lòng tạo bài đăng ngay và luôn
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
