import {
  decodeKoreanURI,
  getAllTags,
  getPostByTags,
  getPropsByTagProps,
  sortTagsByCount,
} from "@/lib/utils";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-items";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/tag";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  const decodingTag = decodeKoreanURI(tag);
  const title = decodingTag.split("-").join(" ").trim();
  console.log(title);
  return {
    title: title,
    description: `Post on topic of ${title}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));

  return paths;
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;

  const decodingTag = decodeKoreanURI(tag);
  const title = decodingTag.split("-").join(" ").trim();

  const displayPosts = getPropsByTagProps(posts);
  const matchTagPosts = getPostByTags(displayPosts, title);

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  console.log("sortedTags", sortedTags);
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr className="mt-8" />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {matchTagPosts.map((post) => {
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
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((el) => (
              <Tag
                tag={el}
                key={el}
                count={tags[el]}
                current={slug(el) === tag}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
