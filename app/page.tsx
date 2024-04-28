import { posts } from "#site/content";
import { MainInto } from "@/components/main-intro";
import { PostItem } from "@/components/post-items";
import { sortPosts } from "@/lib/utils";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  console.log("Home post data...", latestPosts);
  return (
    <>
      <section className="space-y-6 pb-6 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <MainInto />
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-3xl font-black text-left">
          최근 작성한 글
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-t first:border-border">
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
    </>
  );
}
