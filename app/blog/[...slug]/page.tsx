import { posts } from "#site/content";
import MDXcomponent from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import next, { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { cn, formatDate } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

// slug 가져와 제목과 맞는 글 찾음
async function getPostFromPageParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromPageParams(params);
  if (!post) {
    return {};
  }
  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og/${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og/${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromPageParams(params);
  if (!post || !post.published) {
    notFound();
  }
  const postIndex = posts.findIndex(
    (p) => p.slugAsParams === post.slugAsParams
  );
  const previousPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <article className="container py-6 dark:prose-invert prose max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2 ">
        {post.tags?.map((tag) => {
          return <Tag key={tag} tag={tag} />;
        })}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <div>{formatDate(post.date)}</div>
      <ul className="px-3 border-muted-foreground border-2 rounded-lg">
        <p className="text-lg text-muted-foreground">목차</p>
        {post.headingTree.map((tree) => {
          return (
            <li key={tree.value} className="list-none">
              <a
                href={`#${tree.modifyValue}`}
                className={`${
                  tree.depth === 1
                    ? "ml-0"
                    : tree.depth === 2
                    ? "ml-5"
                    : "ml-10"
                } mb-1`}
              >
                {tree.value}
              </a>
            </li>
          );
        })}
      </ul>

      <hr className="my-4" />
      <MDXcomponent code={post.body} />
      <hr className="my-4" />
      <div className="flex flex-wrap justify-between">
        {previousPost && (
          <Link href={`/blog/${previousPost.slugAsParams}`} className="w-full">
            <div
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full h-16 text-lg border-4 mb-4"
              )}
            >
              <p className="w-full text-center">
                이전 글 : {previousPost.title}
              </p>
            </div>
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/${nextPost.slugAsParams}`} className="w-full">
            <div
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full h-16 text-lg border-4"
              )}
            >
              <p className="w-full text-center">다음 글 : {nextPost.title}</p>
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}
