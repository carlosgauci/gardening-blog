import ArticleCard from "./ArticleCard";
import { motion } from "framer-motion";
import { featuredVariants } from "../framer/variants";

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
        <motion.section
          className="w-full h-72 mr-0 mb-4 md:h-featured md:w-1/2 md:mr-4 md:mb-0"
          variants={featuredVariants}
          initial="initialFirst"
          animate="enterFirst"
        >
          <div className="w-full h-full">
            <ArticleCard article={articles[0]} featured={true} />
          </div>
        </motion.section>

        {/* Grid articles */}
        <motion.section
          className="grid grid-cols-1 xl:grid-cols-2 w-full md:w-1/2 gap-4"
          variants={featuredVariants}
          initial="initialFirst"
          animate="enterSecond"
        >
          {articles.slice(1).map((article, i) => (
            <div
              key={article.sys.id}
              className={`w-full h-72 ${i > 1 && "hidden xl:block"}`}
            >
              <ArticleCard article={article} featured={true} />
            </div>
          ))}
        </motion.section>
      </div>
    </section>
  );
}
