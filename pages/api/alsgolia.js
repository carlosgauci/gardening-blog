import algoliasearch from "algoliasearch";
import { createClient } from "contentful";

// Algolia client
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

// Contentful client
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Create, update & delete Algolia entries
const algoliaHandler = async (req, res) => {
  const index = algoliaClient.initIndex(
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  );

  const { sys } = req.body;
  const objectID = sys.id;

  // Delete Algolia entry
  if (sys.type === "DeletedEntry") {
    await index.deleteObject(objectID);
    return res.status(202).end();
  }

  // Get entry from Contentful
  const { items } = await contentfulClient.getEntries({
    content_type: "gardeningArticles",
    "sys.id": objectID,
  });

  // Destructure the data we need
  const {
    title,
    slug,
    category,
    image: {
      fields: {
        file: { url: image },
      },
    },
  } = items[0].fields;

  // Create / update Algolia entry
  if (sys.type === "Entry") {
    await index.saveObject({
      objectID,
      title,
      slug,
      category,
      image: `https:${image}`,
      createdAt: sys.createdAt,
    });
    return res.status(200).send({ success: true });
  }

  res.send({
    message: `Event type ${sys.type} is not a valid trigger`,
  });
};

export default algoliaHandler;
