import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col item-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="w-48 h-48">
            <AvatarImage src="/avatar.png" alt={siteConfig.author} />
            <AvatarFallback>song</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Developer
          </p>
        </div>
        <p className="text-muted-foreground text-lg py-4">
          사용하는 기술에 대해 깊게 이해하는 것이 중요하다고 생각합니다. <br />
          ✅ 프로젝트를 하면서 다른 자바스크립트의 중요성을 깨닫고 모던
          자바스크립트를 학습하며 정리한 것을 블로그를 통해 지식을 나누고
          공유하고 있습니다. 컨벤션과 소통을 중요하게 생각합니다. 웹에서를
          개선한 경험이 있습니다. 그 과정에서 Git Project를 이용해 진행사항과
          개발 중에 생기는 이슈를 공유하고 같이 해결하였습니다.누구나 편하게
          읽을 수 있는 코드를 읽어내는 개발자가 되고 싶습니다. 협업을 진행하며
          소통과 컨벤션의 중요성에 대해 명확하게 알 수 있었습니다. 그래서
          누구와도 편하게 지식을 공유하고 도움이 되는 개발자가 되고 싶습니다.
        </p>
      </div>
    </div>
  );
}
