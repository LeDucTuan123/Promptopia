"use client";
import React, { useEffect, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { Icon } from "@iconify/react";
import { useDebounce } from "@/hooks";
import axios from "axios";
import AccounItem from "./AccounItem";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-h-[min((100vh-60px)-60px,734px)] min-h-[100px] bg-gray-300 shadow-sm rounded-lg sm:top-[310px] top-0">
      {children}
    </div>
  );
};

export default function Search() {
  const [searchValue, setsearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResutl, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    axios({
      method: "GET",
      url: `/api/users/search/${debounced}`,
    })
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch(() => {
        setLoading(false);
      });

    // const
  }, [debounced]);

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClearValue = () => {
    setsearchValue("");
    setSearchResult([]);
  };

  const handleSearchChange = (e: any) => {
    setsearchValue(e.target.value);
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResutl && searchResult.length > 0}
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          <Wrapper>
            <h4 className="text-gray-400 text-2xl pl-4">Account</h4>
            {searchResult.map((item, index) => (
              <AccounItem item={item} key={index} />
            ))}
          </Wrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a email"
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setShowResult(true)}
          required
          className="search_input peer"
        />
        <div className="h-full flex flex-row space-x-2  items-center absolute  right-3 ">
          {!!searchValue && !loading && (
            <Icon
              icon="iconamoon:close-thin"
              fontSize={20}
              className="right-6 cursor-pointer items-center"
              onClick={handleClearValue}
            />
          )}
          {loading && (
            <Icon className="animate-spin" fontSize={20} icon="ep:loading" />
          )}
        </div>
      </form>
    </HeadlessTippy>
  );
}
