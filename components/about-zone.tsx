export const aboutData = [
  { key: "1", content: "dsadsda" },
  { key: "2", content: "dsadsadsdads" },
  { key: "3", content: "dsadsadsdads23123" },
  { key: "4", content: "dsadsadsdads4324342" },
];

export const AboutZone = () => {
  return (
    <div className=" flex flex-wrap justify-between">
      {aboutData.map((data, index) => {
        const delay = index * 100;
        return (
          <div
            key={data.key}
            className={`motion-safe:animate-slide-in-right delay-${delay}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            ss
          </div>
        );
      })}
    </div>
  );
};
