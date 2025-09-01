import React from "react";
import { Post, posts } from "#site/content";
import { SeriesItem } from "@/components/series-item";
import { groupPostsBySeries } from "@/lib/series";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Series",
  description: "This page collects articles by series.",
};

export default function series() {
  const seriesDescriptions = [
    {
      subject: "Mordern",
      description: "모던 자바스크립트를 읽고 정리한 글 입니다.",
    },
    {
      subject: "알고리즘",
      description: "알고리즘에 대해 시리즈로 정리한 내용입니다.",
    },
    {
      subject: "docker",
      description: "docker에 대해 정리한 글 입니다.",
    },
  ];

  const getSeriesPost = groupPostsBySeries(posts);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="text-4xl font-extrabold mb-10">Series</h1>

      <ul>
        {Object.entries(getSeriesPost).map(([seriesName, posts]) => {
          const seriesInfo = seriesDescriptions.find(
            (el) => el.subject === seriesName
          );
          const description = seriesInfo
            ? seriesInfo.description
            : "설명이 제공되지 않았습니다.";

          return (
            <React.Fragment key={seriesName}>
              <div className="w-full flex flex-wrap justify-between">
                <div className="mb-10">
                  <h2 className="text-3xl mb-2">{seriesName}</h2>
                  <p>{description}</p>
                </div>
                <div className="w-full">
                  {posts.map((post: Post) => {
                    const { title, description, slugAsParams } = post;
                    return (
                      <li key={post.slug} className="w-full">
                        <SeriesItem
                          title={title}
                          description={description}
                          slugAsParams={slugAsParams}
                        />
                      </li>
                    );
                  })}
                </div>
              </div>
              <hr className="my-10 h-[2px] bg-[#000000]" />
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
