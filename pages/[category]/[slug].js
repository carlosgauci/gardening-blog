import { createClient } from "contentful";
import Image from "next/image";

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
    fallback: false,
  };
}

// Get single article and related articles from contentful
export async function getStaticProps({ params }) {
  const [article, relatedArticles] = await Promise.all([
    client.getEntries({
      content_type: "gardeningArticles",
      "fields.slug": params.slug,
    }),
    client.getEntries({
      content_type: "gardeningArticles",
      "fields.category": params.category,
      limit: 7,
    }),
  ]);

  // ----IMPLEMENT BETTER WAY FOR RELATED POSTS LATER----
  //   Filter current article from related
  const filteredArticles = relatedArticles.items.filter(
    (item) => item.fields.slug !== article.items[0].fields.slug
  );

  return {
    props: {
      article: article.items[0],
      relatedArticles: filteredArticles,
    },
    revalidate: 120,
  };
}

export default function PostPage({ article, relatedArticles }) {
  const { image, title } = article.fields;
  return (
    <div className="pt-14 md:pt-20 xl:container xl:max-w-7xl">
      {/* Article image */}
      <section className="relative w-full mb-8 h-72 md:h-featured xl:rounded-b-md overflow-hidden">
        <Image
          src={`https:${image.fields.file.url}`}
          layout="fill"
          objectFit="cover"
          quality={10}
          alt={title}
        />
      </section>

      <section className="md:flex relative">
        {/* Article content */}
        <h1>hi im an article</h1>
      </section>
    </div>
  );
}
