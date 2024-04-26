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
    <div className="flex">
      <Image
        src={mainImage3}
        alt=""
        width={200}
        height={200}
        className="w-0 lg:w-auto"
      />

      <div className="container flex flex-col gap-4 text-center min-w-[486px]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance z-10">
          Hello I&apos;m Song
        </h1>
        <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
          Welcome to my blog template.. Built using tailwind, shadcn, velit and
          Next.js 14.
        </p>

        <div className="flex flex-col gap-4 justify-center sm:flex-row">
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
        </div>
      </div>
      <Image
        src={mainImage4}
        alt=""
        width={200}
        height={200}
        className="w-0 lg:w-auto"
      />
    </div>
  );
}
