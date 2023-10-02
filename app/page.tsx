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
        Sau khi loading lại trang hoặc like hoặc đăng nhập vào,
         bạn hãy bật qua trang khác và quay lại trang này sẽ được,
          tính năng này hơi lạ mình chưa fix được ^^!
      </p>
      

      {/* Feed */}
      <Feed />
    </section>
  );
}
