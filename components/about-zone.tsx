"use client";
import Image from "next/image";
import { CuboidCanvas } from "./canvas/snowflake";

export const aboutData = [
  { key: "1", content: "dsadsda" },
  { key: "2", content: "dsadsadsdads" },
  { key: "3", content: "dsadsadsdads23123" },
  { key: "4", content: "dsadsadsdads4324342" },
];

export const AboutZone = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute z-auto">
        <CuboidCanvas />
      </div>
    </div>
  );
};
