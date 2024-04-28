import { Heading, Root } from "mdast";
import { visit } from "unist-util-visit";

interface HeadingTreeProps {
  depth: number;
  value: string;
}

export function extractHeadings(mdast: Root | undefined): HeadingTreeProps[] {
  const headings: HeadingTreeProps[] = [];
  if (!mdast) return []; // mdast가 없으면 빈 배열 반환

  // 'heading' 유형의 노드를 찾아서 처리
  visit(mdast, "heading", (node: Heading) => {
    const { depth, children } = node;
    if (depth >= 1 && depth <= 3) {
      // children에서 텍스트 노드의 value를 추출하여 하나의 문자열로 합침
      const value = children
        .filter(
          (child): child is { type: "text"; value: string } =>
            child.type === "text"
        )
        .map((textNode) => textNode.value)
        .join(" ");

      // 추출한 정보를 headings 배열에 추가
      headings.push({ depth, value });
    }
  });

  return headings; // 추출된 헤딩 정보를 반환
}

// headTree 가져와 정규식으로 수정
export function generateTableOfContents(mdast: Root | undefined) {
  const headings = extractHeadings(mdast);
  const transformedHeadings = headings.map((heading) => ({
    ...heading,
    modifyValue: heading.value
      .replace(/\s+/g, "-")
      .replace(/(\d)\./g, "$1")
      .trim(),
  }));

  return transformedHeadings;
}
