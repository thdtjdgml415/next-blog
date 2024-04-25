import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "#site/content";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { Root } from "mdast";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 날짜 한국어로 변환
export function formatDate(input: string | number) {
  const date = new Date(input);
  return date.toLocaleDateString("ko-KO", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// 글 정렬 함수
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}
// 모든 태그 가져오기
export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });
  return tags;
}
// 태그 정렬
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPropsByTagProps(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugfiedTags = post.tags.map((tag) => slug(tag));
    return slugfiedTags;
  });
}
