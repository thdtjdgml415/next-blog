"use client";

import { posts } from "#site/content";
import { FallingTag } from "@/components/canvas/falling-tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getAllTags, sortTagsByCount } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  const pathname = usePathname();

  return (
    <div className="container max-w-4xl p-y6 lg:py-10">
      {pathname === "/blog" ? (
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              개발 이야기 글 모음 입니다.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-12 mt-5 ">
        {pathname === "/blog" ? (
          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-[500px] max-h-[500px] flex flex-wrap gap-2 !p-0">
              <FallingTag tags={sortedTags} />
            </CardContent>
          </Card>
        ) : null}

        <div
          className={cn(
            "col-span-12 col-start-1",
            pathname === "/blog" ? "sm:col-span-8" : "sm:col-span-12"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
