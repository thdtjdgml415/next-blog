import { posts } from "#site/content";
import { AboutZone } from "@/components/about-zone";
import { MainInto } from "@/components/main-intro";
import { PostItem } from "@/components/post-items";
import { sortPosts } from "@/lib/utils";

export const aboutData = [
  { key: "1", content: "dsadsda" },
  { key: "2", content: "dsadsadsdads" },
  { key: "3", content: "dsadsadsdads23123" },
  { key: "4", content: "dsadsadsdads4324342" },
];

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <div className="container">
      <section className="container max-w-2xl space-y-6 pb-4 pt-10 ">
        <MainInto />
      </section>
      {/* <section className="container max-w-2xl">
        <div className="flex justify-between flex-wrap ">
          {aboutData.map((data, index) => {
            const delay = index * 100;
            return (
              <div
                key={data.key}
                className={`motion-safe:animate-slide-in-right delay-${delay}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AboutZone content={data.content} />
              </div>
            );
          })}
        </div>
      </section> */}
      <section className="container max-w-2xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-xl font-medium text-left">Recent</h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li
              key={post.slug}
              className="first:border-t first:border-border motion-safe:animate-slide-in-right "
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
