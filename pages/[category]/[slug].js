import { createClient } from "contentful";
import Image from "next/image";
import ArticleContent from "../../components/ArticleContent";
import Sidebar from "../../components/Sidebar";
import Fallback from "../../components/Fallback";
import useMediaQuery from "../../hooks/useMediaQuery";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Get article paths from contentful
export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "gardeningArticles",
  });

  const paths = res.items.map((item) => {
    return {
      params: { category: item.fields.category, slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

// Get single article, related articles and categories from contentful
export async function getStaticProps({ params }) {
  const [article, relatedArticles, categories] = await Promise.all([
    client.getEntries({
      content_type: "gardeningArticles",
      "fields.slug": params.slug,
    }),
    client.getEntries({
      content_type: "gardeningArticles",
      order: "-sys.createdAt",
      limit: 7,
      "fields.category": params.category,
    }),
    client.getEntries({
      content_type: "gardeningCategories",
    }),
  ]);

  // Redirect user if the article doesnt exist (instead of fallback)
  if (!article.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      article: article.items[0],
      relatedArticles: relatedArticles.items,
      categories: categories.items,
    },
    revalidate: 120,
  };
}

export default function ArticlePage({ article, relatedArticles, categories }) {
  // Show fallback while we retrieve data if a new article was added
  if (!article) {
    return <Fallback />;
  }

  //   Filter current article from related articles
  const filteredArticles = relatedArticles.filter(
    (item) => item.fields.slug !== article.fields.slug
  );

  // Image & title for current article
  const { image, title } = article.fields;

  // Show more slides on large screens
  const largeScreen = useMediaQuery(768);
  const slice = (articles) => articles.slice(0, 3);

  return (
    <div className="pt-14 md:pt-20 xl:container xl:max-w-7xl">
      {/* Article image */}
      <section className="relative w-full mb-8 h-72 md:h-featured xl:rounded-b-md overflow-hidden">
        <Image
          src={`https:${image.fields.file.url}`}
          layout="fill"
          objectFit="cover"
          quality={50}
          alt={title}
          priority={true}
          key={article.fields.slug}
        />
      </section>
      <section className="md:flex relative">
        {/* Article content */}
        <ArticleContent
          article={article}
          relatedArticles={
            largeScreen ? filteredArticles : slice(filteredArticles)
          }
        />

        <Sidebar categories={categories} />
      </section>
    </div>
  );
}
