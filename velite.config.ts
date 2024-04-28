import { defineConfig, defineCollection, s, ZodMeta } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Image, Root } from "mdast";
import { visit } from "unist-util-visit";
import { generateTableOfContents } from "./lib/toc";

// blog/hello-world
const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      tags: s.array(s.string()).optional(),
      published: s.boolean().default(true),
      thumbnail: s
        .object({
          local: s.string(),
        })
        .optional(),
      headingTree: s.custom().transform((data, { meta }) => {
        if (!meta.mdast) return [];
        return generateTableOfContents(meta.mdast);
      }),
      body: s.mdx(),
    })
    .transform(computedFields)
    .transform(async (data, { meta }) => {
      const thumbnailURL = await generateThumbnailURL(meta.mdast);

      return {
        ...data,
        url: `/blog/${data.slug}.jpg`,
        thumbnail: { local: thumbnailURL },
      };
    }),
});

// MDAST를 순회하면서 모든 이미지 뽑아내기
function extractImgSrc(mdast: Root | undefined): string[] {
  const images: string[] = [];
  if (!mdast) {
    console.log("No MDAST available");
    return images;
  }
  visit(mdast, "image", (node: Image) => {
    images.push(node.url);
  });
  return images;
}

// 썸네일 경로 생성
export async function generateThumbnailURL(mdast: Root | undefined) {
  const images = extractImgSrc(mdast);

  if (images.length > 0) {
    return images[0]; // 첫 번째 이미지 URL 반환
  } else {
    // 이미지가 없는 경우, 기본 썸네일 경로 또는 로직 제공
    return undefined;
  }
}

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
