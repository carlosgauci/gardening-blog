import { createClient } from "contentful";
import CategoryPage from "../components/CategoryPage";
import Sidebar from "../components/Sidebar";
import Image from "next/image";

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
    fallback: false,
  };
}

// Get articles for category from contentful
export async function getStaticProps({ params }) {
  const [articles, categories] = await Promise.all([
    client.getEntries({
      content_type: "gardeningArticles",
      "fields.category": params.category,
    }),
    client.getEntries({
      content_type: "gardeningCategories",
    }),
  ]);

  // Filter this category from category list
  const thisCategory = categories.items.filter(
    (cat) => cat.fields.slug === params.category
  );

  return {
    props: {
      articles: articles.items,
      category: thisCategory,
      categories: categories.items,
    },
    revalidate: 120,
  };
}

export default function Category({ articles, category, categories }) {
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
        <CategoryPage category={category} articles={articles} />

        <Sidebar categories={categories} />
      </section>
    </div>
  );
}
