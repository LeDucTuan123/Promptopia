"use client";

import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-col flex-center pt-14">
      <h1 className="head_text text-center">
        Discover & share <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In numquam
        libero necessitatibus dolore exercitationem officiis rem nihil cum.
        Officiis, suscipit vero deserunt porro velit eaque fuga facere error
        aliquid soluta!
      </p>
      

      {/* Feed */}
      <Feed />
    </section>
  );
}
