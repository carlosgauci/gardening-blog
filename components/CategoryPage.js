import ArticleCard from "./ArticleCard";

export default function CategoryPage({ articles }) {
  return (
    <div className="w-full md:w-2/3 lg:w-3/4 px-4 xl:pl-0 xl:pr-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 items-center gap-x-8">
        {articles.map((article) => (
          <ArticleCard key={article.sys.id} article={article} />
        ))}
      </section>
    </div>
  );
}
