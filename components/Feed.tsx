"use client";

import { PostType } from "@/types/post";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Search from "./Search";
import Loading from "./Loading";

export interface PropsCardList {
  data: PostType[];
  handleAddLike: (item: any) => {} | void;
}

const PromptCardList = ({ data, handleAddLike }: PropsCardList) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} onAddLike={handleAddLike} />
      ))}
    </div>
  );
};

export default function Feed() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState([]);
  const [searchText, setSearchText] = useState("All");

  const fetchPosts = async () => {
    await axios({
      method: "GET",
      url: "/api/prompt",
    }).then((res) => {
      if (searchText === "All") {
        let newSearch = res.data;
        setPost(newSearch);
      } else {
        let newSearch = res.data.filter((value: PostType) =>
          value.role.toLowerCase().includes(searchText.toLowerCase())
        );
        setPost(newSearch);
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [searchText]);

  const handleAddLike = (item: PostType) => {
    post.map(async (i: PostType) => {
      if (i._id === item._id) {
        try {
          await axios({
            method: "PUT",
            url: `/api/prompt/${i._id}`,
            data: JSON.stringify({
              like: i.like,
            }),
          }).then((res) => res.data && window.location.reload());
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <div className="w-full sm:flex hidden">
        <Search />
      </div>

      <select className="mt-6" onChange={handleSearchChange}>
        <option value="All">All</option>
        <option value="Trò chơi">Trò chơi</option>
        <option value="Văn học">Văn học</option>
        <option value="Triếc lý">Triếc lý</option>
        <option value="Công nghệ">Công nghệ</option>
      </select>

      {post.length > 0 ? (
        <PromptCardList data={post} handleAddLike={handleAddLike} />
      ) : (
        <Loading />
      )}
    </section>
  );
}
