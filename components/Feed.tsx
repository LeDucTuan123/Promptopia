"use client";

import { PostType } from "@/types/post";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

export interface PropsCardList {
  data: PostType[];
  handleTagClick: (e: any) => void;
  handleAddLike: (item: any) => {} | void;
}

const PromptCardList = ({ data, handleTagClick, handleAddLike }: PropsCardList) => {
  
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          onHandleTagClick={handleTagClick}
          onAddLike={handleAddLike}
        />
      ))}
    </div>
  );
};

export default function Feed() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  
  const [post, setPost] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [searchTimeOut, setSearchTimeOut] = useState(null);
  // const [searchedResult, setSearchedResult] = useState([]);

  
  const fetchPosts = async () => {
    await axios.get("/api/prompt").then((res) => {
      const newSearch = res.data.filter((value: PostType) =>
        value.tag.toLowerCase().includes(searchText.toLowerCase())
      );
      setPost(newSearch);
    });
  };


  useEffect(() => {

    fetchPosts();

  }, [searchText]);


  // const filterPrompts = (searchtext: any) => {
  //   const regex = new RegExp(searchtext, "i");

  //   return post.filter(
  //     (item: PostType) =>
  //       regex.test(item.creator.username) ||
  //       regex.test(item.prompt) ||
  //       regex.test(item.tag)
  //   );
  // };

  const handleAddLike = (item: PostType) => {

    post.map(async (i: PostType) => {
      if (i._id === item._id) {

          try {
            await axios({
              method: "PUT",
              url: `/api/prompt/${i._id}`,
              data: JSON.stringify(        
                {
                  like: i.like
                } 
              ),
            }).then(res => res.data && window.location.reload())
           
          } catch (error) {
            console.log(error);
          } 
        }
      }
      )
  }


  // const handleAddLike = (item: any) => {
  //   let newItems: any = post.map((i: PostType) => {
  //     if (i._id === item._id) {
  //       return {
  //         ...i,
  //         like: i.like + 1
  //       };
  //     }

  //     return i;
  //   });
  //   setPost(newItems);
  // };

  const handleTagClick = (e: any) => {
    setSearchText(e);
  };

  const handleClearText = () => setSearchText('')

  const handleSearchChange = (e: any) => {
    // clearTimeout(searchTimeOut);
      setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <div className="h-full flex flex-row space-x-2  items-center absolute  right-0 ">
        {searchText && (
          <Icon
          icon="iconamoon:close-thin"
          fontSize={20}
          className="right-6 cursor-pointer items-center"
          onClick={handleClearText}
          />
          )}
          <button className=" w-fit h-full px-2 bg-slate-600 border-none rounded-tr-md rounded-br-md">
            Search
          </button>
          </div>
      </form>

      <PromptCardList data={post} handleTagClick={handleTagClick} handleAddLike={handleAddLike} />
    </section>
  );
}
