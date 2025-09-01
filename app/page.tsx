import { posts } from "#site/content";
import { MainInto } from "@/components/main-intro";
import { PostItem } from "@/components/post-items";

import { sortPosts } from "@/lib/utils";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <div className="container">
      <section className="w-full mx-auto lg:px-[2rem] max-w-2xl space-y-6  pt-10 ">
        <MainInto />
      </section>
      {/* <section className="container max-w-2xl h-[304px]">
        <AboutZone />
      </section> */}
      <section className="w-full mx-auto lg:px-[2rem] max-w-2xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-xl font-medium text-left">Recent</h2>
        <ul className="flex flex-col group/list">
          {latestPosts.map((post) => (
            <li
              key={post.slug}
              className=" motion-safe:animate-slide-in-right "
            >
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                thumbnail={post.thumbnail.local}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
