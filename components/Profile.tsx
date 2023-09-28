import { PostType } from "@/types/post";
import PromptCard from "./PromptCard";

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
  // const handleSearchChange = (e: any) => {
  //   setSearchText(e.target.value);
  // };
console.log(data, name)
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Propfile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

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
    </section>
  );
}
