import Image from "next/image";
// import mainImage1 from "../assets/img/spring.png";
// import mainImage2 from "../assets/img/thorus.png";
import mainImage3 from "../assets/img/typescriptLogo.png";
import mainImage4 from "../assets/img/javascriptLogo.png";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function MainInto() {
  return (
    <div className="flex flex-col gap-4 ">
      <h1
        className={cn(
          "text-xl font-medium text-balance",
          `relative w-[max-content] font-mono
            motion-safe:before:animate-typewriter
            motion-safe:after:animate-caret
            before:absolute before:inset-[-4px] before:bg-background
            after:absolute after:inset-[-4px] after:w-[0.125em] after:bg-black`
        )}
      >
        hello, I&apos;m song
      </h1>

      <p
        className={cn(
          "max-w-[48rem] text-start text-muted-foreground sm:text-xl ",
          `motion-safe:animate-slide-in-right`
        )}
      >
        공유하고 받으며 함께 성장하는 것을 바탕으로 삶을 추구하고, 건강한 영향에
        기여하는 사람을 추구합니다.
      </p>

      {/* <div className="flex flex-col gap-4 justify-center sm:flex-row">
        <Link
          href="/blog"
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
        >
          View my blog
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full sm:w-fit"
          )}
        >
          Github
        </Link>
      </div> */}
    </div>
  );
}

// <div className="flex">
{
  /* <Image
        src={mainImage3}
        alt=""
        width={200}
        height={200}
        className="w-0 lg:w-auto"
      /> */
}
{
  /* <Image
        src={mainImage4}
        alt=""
        width={200}
        height={200}
        className="w-0 lg:w-auto"
      /> */
}
// </div>
