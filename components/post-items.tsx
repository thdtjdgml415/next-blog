"use client";

import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "./tag";
import { trackGAEvent } from "@/lib/google-analytics";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  thumbnail?: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  thumbnail,
  tags,
}: PostItemProps) {
  const submitAnalytics = (
    title: string,
    action: string,
    description: string | undefined
  ) => {
    const nowTime: Date = new Date();
    trackGAEvent(title, nowTime, description);
  };

  return (
    <article
      className="flex flex-col gap-2 py-3 px-2 group/item hover:bg-[#ccc]/30 rounded-md transition-all duration-200 group-hover/list:opacity-50 hover:!opacity-100"
      onClick={() => submitAnalytics(title, "Click", description)}
    >
      <Link href={"/" + slug}>
        <div className="flex justify-between">
          <div>
            <h2 className="text-md font-bold mb-2 group-hover/item:text-ST_postive group-hover/item:scale-105 transition-all duration-300">
              {title}
            </h2>
            <div className="flex justify-between items-center mb-1">
              <dl>
                <dt className="sr-only">Published On</dt>
                <dd className="text-xs sm:text-xs font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={date}>{formatDate(date)}</time>
                </dd>
              </dl>
            </div>

            <div className="text-sm text-muted-foreground group-hover/item:text-ST_postive">
              {description}
            </div>
          </div>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="블로그 썸네일"
              width={75}
              height={75}
              className="object-contain "
            />
          ) : null}
        </div>
        <div className="flex gap-2 overflow-auto">
          {/* {tags?.map((tag) => {
          return <Tag tag={tag} key={tag} />;
        })} */}
        </div>
      </Link>
    </article>
  );
}
