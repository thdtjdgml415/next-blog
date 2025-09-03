import { posts } from "#site/content";
import { PostItem } from "@/components/post-items";
import { QueryPagination } from "@/components/query-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { sortPosts } from "@/lib/utils";
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

  return (
    <>
      <QueryPagination totalPages={totalPages} className="justify-end" />
      <hr className="mt-8" />
      {displayPosts?.length > 0 ? (
        <ul className="flex flex-col group/list motion-safe:animate-slide-in-right">
          {displayPosts.map((post) => {
            const { slug, title, description, date, thumbnail, tags } = post;
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
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </>
  );
}
