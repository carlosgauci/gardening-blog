import { createClient } from "contentful";
import CategoryPage from "../components/CategoryPage";
import Sidebar from "../components/Sidebar";
import Fallback from "../components/Fallback";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "gardeningCategories",
  });

  const paths = res.items.map((item) => {
    return {
      params: { category: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [articles, category, categories] = await Promise.all([
    // Get articles for this category
    client.getEntries({
      content_type: "gardeningArticles",
      "fields.category": params.category,
    }),
    // Get category
    client.getEntries({
      content_type: "gardeningCategories",
      "fields.slug": params.category,
    }),
    // Get all categories for navigation
    client.getEntries({
      content_type: "gardeningCategories",
    }),
  ]);

  return {
    props: {
      articles: articles.items,
      category: category.items,
      categories: categories.items,
    },
    revalidate: 120,
  };
}

export default function Category({ articles, category, categories }) {
  const router = useRouter();
  // Show fallback while we retrieve data if a new category was added
  if (router.isFallback) {
    return <Fallback />;
  }

  // Show 404 if we have no category to retrieve
  if (!category.length) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const {
    categoryImage: {
      fields: {
        file: { url: image },
      },
    },
  } = category[0].fields;

  const { slug, name } = category[0].fields;
  const formattedCategory = slug.replace(/-/g, " ");

  return (
    <div className="pt-14 md:pt-20  xl:container xl:max-w-7xl">
      {/* Category banner */}
      <div className="relative w-full h-64 md:h-96 flex items-center justify-center bg-black mb-8 rounded-b-md overflow-hidden">
        <Image
          src={`https:${image}`}
          layout="fill"
          objectFit="cover"
          quality={30}
          priority={true}
          className="opacity-70"
          alt={name}
        />

        {/* Category title */}
        <h2 className="text-white text-4xl md:text-7xl uppercase text-center tracking-widest font-bold mb-4 relative">
          {formattedCategory}
        </h2>
      </div>

      <section className="md:flex">
        {/* Category content */}
        {articles && <CategoryPage articles={articles} />}

        <Sidebar categories={categories} />
      </section>
    </div>
  );
}
