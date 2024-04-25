import { Post } from "#site/content";
import { clsx, type ClassValue } from "clsx";
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge";

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

// 태그 생성
export function getPropsByTagProps(posts: Array<Post>) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugfiedTags = post.tags.map((tag) => slug(tag));

    return slugfiedTags;
  });
}

// 태그에 알맞은 게시글 가져오기
export function getPostByTags(posts: Array<Post>, tag: string) {
  return posts.filter((post) => post.tags?.includes(tag));
}

// tag중 한글인 경우 디코딩
export function decodeKoreanURI(encodedURI: string) {
  // URL 인코딩된 문자열에서 한글 패턴을 찾기 위한 정규식
  const koreanEncodedPattern = /(%[Ee][Dd].{4}|%[Ee][Cc].{4}|%[Ee][Bb].{4})+/g;

  // 인코딩된 문자열에 한글이 포함되어 있는지 검사
  if (koreanEncodedPattern.test(encodedURI)) {
    // 한글이 포함된 부분을 디코딩
    return decodeURIComponent(encodedURI);
  } else {
    // 한글이 포함되지 않은 경우 원본 문자열 반환
    return encodedURI;
  }
}
