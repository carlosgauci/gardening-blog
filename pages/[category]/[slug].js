import { createClient } from "contentful";
import Image from "next/image";
import ArticleContent from "../../components/ArticleContent";
import Sidebar from "../../components/Sidebar";
import Fallback from "../../components/Fallback";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import SEO from "../../components/SEO";

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

  return {
    props: {
      article: article.items,
      relatedArticles: relatedArticles.items,
      categories: categories.items,
    },
    revalidate: 120,
  };
}

export default function ArticlePage({ article, relatedArticles, categories }) {
  const router = useRouter();
  // Show fallback while we retrieve data if a new article was added
  if (router.isFallback) {
    return <Fallback />;
  }

  // Show 404 if we have no article to retrieve
  if (!article.length) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  //   Filter current article from related articles
  const filteredArticles = relatedArticles.filter(
    (item) => item.fields.slug !== article[0].fields.slug
  );

  // Image & title for current article
  const { image, title, seoDescription } = article[0].fields;

  // Capitalize article title for SEO title
  const capitalize = (word) => {
    return word
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Show more slides on large screens
  const largeScreen = useMediaQuery(768);
  const slice = (articles) => articles.slice(0, 3);

  return (
    <>
      <SEO
        title={`${capitalize(title)} | Pro Gardening`}
        desc={seoDescription}
        image={`https:${image.fields.file.url}`}
      />
      <div className="pt-14 md:pt-20 xl:container xl:max-w-7xl">
        {/* Article image */}
        <section className="relative w-full mb-8 h-72 md:h-96 xl:rounded-b-md overflow-hidden">
          <Image
            src={`https:${image.fields.file.url}`}
            layout="fill"
            objectFit="cover"
            quality={50}
            alt={title}
            priority={true}
            key={article[0].fields.slug}
          />
        </section>
        <section className="md:flex relative">
          {/* Article content */}
          <ArticleContent
            article={article[0]}
            relatedArticles={
              largeScreen ? filteredArticles : slice(filteredArticles)
            }
          />

          <Sidebar categories={categories} />
        </section>
      </div>
    </>
  );
}
