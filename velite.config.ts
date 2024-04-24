import { defineConfig, defineCollection, s, ZodMeta } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface ThumbnailType {
  local: any;
}

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
      published: s.boolean().default(true),
      thumbnail: s
        .object({
          local: s.string(),
        })
        .optional(),
      body: s.mdx(),
    })
    .transform(computedFields)
    .transform(async (data, { meta }) => {
      console.log("metac", meta);
      // console.log("generateThumbnailURL.mdast", meta.mdast);

      return { ...data, url: `${data.slug}.jpg` };
    }),
});

// // 정확한 이미지 경로 생성
// function extractImgSrc(mdast: Root | undefined): string[] {
//   console.log("extractImgSrc", mdast);
//   const images: string[] = [];
//   if (!mdast) {
//     console.log("No MDAST available");
//     return images;
//   }
//   visit(mdast, "image", (node) => {
//     images.push(node.url);
//   });
//   return images;
// }

// // 썸네일 직접 입력
// function createThumbnail(filePath: string) {}

// 썸네일 경로 생성
export async function generateThumbnailURL(title: string, filePath: string) {
  console.log(
    "generateThumbnailURL",
    title,
    "generateThumbnailURL 1",
    filePath
  );
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
