import React from "react";
import { v4 as uuidv4 } from "uuid";

export function Tag({ tag }: { tag: string[] }) {
  return (
    <div className="flex gap-2">
      {tag.map((el) => {
        return (
          <span
            key={uuidv4()}
            className="font-normal text-xs space-x-1 border-solid border-2 rounded-xl px-2 py-1 bg-background text-muted-foreground"
          >
            {el}
          </span>
        );
      })}
    </div>
  );
}
