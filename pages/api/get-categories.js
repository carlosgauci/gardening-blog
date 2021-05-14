// Get category list for use in navigation since we cant getStaticProps in non-page components
import axios from "axios";

const contentfulQuery = async (query, variables) => {
  const result = await axios({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    data: {
      query,
      variables,
    },
  });

  return result.data;
};

const CATEGORY_QUERY = `
     query myQuery {
        gardeningCategoriesCollection {
            items {
                name
                slug
            }
        }
    }
`;

export default async (req, res) => {
  const { data, errors } = await contentfulQuery(CATEGORY_QUERY);

  if (errors) {
    return res.status(500).json({
      errors,
    });
  }

  return res.status(200).json(data.gardeningCategoriesCollection.items);
};
