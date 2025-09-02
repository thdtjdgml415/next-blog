import { posts } from "#site/content";
import { FallingTag } from "@/components/canvas/falling-tag";
import { PostItem } from "@/components/post-items";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My blog",
  description: "This is a description",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            개발 이야기 글 모음 입니다.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-5 ">
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[500px] max-h-[500px] flex flex-wrap gap-2 !p-0">
            <FallingTag tags={sortedTags} />
          </CardContent>
        </Card>
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <QueryPagination totalPages={totalPages} className="justify-end" />
          <hr className="mt-8" />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col group/list motion-safe:animate-slide-in-right">
              {displayPosts.map((post) => {
                const { slug, title, description, date, thumbnail, tags } =
                  post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      title={title}
                      description={description}
                      date={date}
                      thumbnail={thumbnail.local}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>nothing</p>
          )}
        </div>
      </div>
    </div>
  );
}
