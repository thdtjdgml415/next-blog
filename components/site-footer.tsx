import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex items-center space-x-4">
          <a href="mailto:hello@example.com" target="_blank" rel="noreferrer">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6 " />
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6 " />
          </a>
          <a href={siteConfig.links.linkedIn} target="_blank" rel="noreferrer">
            <span className="sr-only">LinkedIn</span>
            <Icons.linkedIn className="h-8 w-8]" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a href={siteConfig.links.personalSite} target="_blank">
            {siteConfig.sitetag}
          </a>
        </div>
      </div>
    </footer>
  );
}
