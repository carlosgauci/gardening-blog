import { createClient } from "contentful";
import Hero from "../components/Hero";
import FeaturedContent from "../components/FeaturedContent";
import ArticleSlider from "../components/ArticleSlider";
import NewsletterSection from "../components/NewsletterSection";
import useMediaQuery from "../hooks/useMediaQuery";
import SEO from "../components/SEO";

// Get articles from Contentful
export async function getStaticProps() {
  // Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const [featured, gardening, farming, animalHusbandry] = await Promise.all([
    // Latest featured posts
    client.getEntries({
      content_type: "gardeningArticles",
      limit: 5,
      order: "-sys.createdAt",
      "fields.featured": true,
    }),
    // Latest posts for category article sliders
    client.getEntries({
      content_type: "gardeningArticles",
      limit: 7,
      order: "-sys.createdAt",
      "fields.category": "gardening",
      "fields.featured": false,
    }),
    client.getEntries({
      content_type: "gardeningArticles",
      limit: 7,
      order: "-sys.createdAt",
      "fields.category": "farming",
      "fields.featured": false,
    }),
    client.getEntries({
      content_type: "gardeningArticles",
      limit: 7,
      order: "-sys.createdAt",
      "fields.category": "animal-husbandry",
      "fields.featured": false,
    }),
  ]);

  return {
    props: {
      featured: featured.items,
      gardening: gardening.items,
      farming: farming.items,
      animalHusbandry: animalHusbandry.items,
    },
    revalidate: 120,
  };
}

export default function Home({
  featured,
  gardening,
  farming,
  animalHusbandry,
}) {
  // Show more slides on large screens
  const largeScreen = useMediaQuery(768);
  const slice = (articles) => articles.slice(0, 3);

  return (
    <>
      <SEO
        title="Pro Gardening by Farmer Joe"
        desc="Browse over 100+ hours of content related to gardening & farming."
        image="/images.hero.jpg"
      />

      <Hero />

      <FeaturedContent articles={featured} />

      <ArticleSlider
        name={"Gardening"}
        articles={largeScreen ? gardening : slice(gardening)}
      />

      <ArticleSlider
        name={"Farming"}
        articles={largeScreen ? farming : slice(farming)}
      />

      <ArticleSlider
        name={"Animal Husbandry"}
        articles={largeScreen ? animalHusbandry : slice(animalHusbandry)}
      />

      <NewsletterSection index={true} />
    </>
  );
}
