import ArticleCard from "./ArticleCard";

export default function FeaturedContent({ articles }) {
  return (
    <section className="px-4 my-4 md:my-6 md:px-16">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-2">
        Featured Content
      </h2>

      {/* Content */}
      <div className="block md:flex">
        {/* Large article (on large screens) */}
        <section className="w-full h-72 mr-0 mb-4 md:h-featured md:w-1/2 md:mr-4 md:mb-0">
          <div className="w-full h-full">
            <ArticleCard article={articles[0]} featured={true} />
          </div>
        </section>

        {/* Grid articles */}
        <section className="grid grid-cols-1 xl:grid-cols-2 w-full md:w-1/2 gap-4">
          {articles.slice(1).map((article, i) => (
            <div
              key={article.sys.id}
              className={`w-full h-72 ${i > 2 && "hidden xl:block"}`}
            >
              <ArticleCard article={article} featured={true} />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
