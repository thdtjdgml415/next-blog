import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "./tag";

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
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3 px-2 group hover:bg-[#ccc]/30">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold  mb-2  group-hover:text-ST_postive transition-all">
            <Link href={"/" + slug}>{title}</Link>
          </h2>
          <div className="flex justify-between items-center mb-1">
            <dl>
              <dt className="sr-only">Published On</dt>
              <dd className="text-xs sm:text-base font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime="date">{formatDate(date)}</time>
              </dd>
            </dl>
          </div>

          <div className="max-w-none text-muted-foreground group-hover:text-ST_postive">
            {description}
          </div>
        </div>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt="블로그 썸네일"
            width={100}
            height={100}
            className="object-contain group-hover:-translate-y-2 transition-all"
          />
        ) : null}
      </div>
      <div className="flex gap-2 overflow-auto">
        {tags?.map((tag) => {
          return <Tag tag={tag} key={tag} />;
        })}
      </div>
    </article>
  );
}
