import { Post } from "#site/content";

type SeriesPosts = Record<string, Post[]>;
// 게시물을 시리즈별로 그룹화하는 함수
export function groupPostsBySeries(posts: Array<Post>) {
  return posts.reduce<SeriesPosts>((acc, post) => {
    const { series } = post;

    if (series) {
      if (!acc[series]) {
        acc[series] = [];
      }
      acc[series].push(post);
    }
    return acc;
  }, {});
}
