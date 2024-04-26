import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import Link from "next/link";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-items";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <>
      <section className="container max-w-4xl pb-6 pt-6 md:pb-12 md:mt-10">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="min-w-32 max-w-32 flex flex-col gap-2">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/avatar.png" alt={siteConfig.author} />
              <AvatarFallback>song</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-center break-words">
              {siteConfig.author}
            </h2>
          </div>
          <p className="text-black text-lg py-4">
            유쾌한 삶을 살아가며 대단하진 않지만 누군가에게 도움이 되는 삶을
            살아가고 싶습니다.
          </p>
        </div>
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
