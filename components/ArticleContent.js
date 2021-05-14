import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import RelatedArticles from "../components/RelatedArticles";

export default function ArticleContent({ article, relatedArticles }) {
  const { title, articleContent, authorName, authorImage } = article.fields;

  const date = new Date(article.sys.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="w-full md:w-2/3 lg:w-3/4 px-4 xl:pl-0 xl:pr-8">
      <section>
        {/* Article title */}
        <h2 className="capitalize text-2xl font-bold mb-4">{title}</h2>

        <div className="flex items-center mb-8 font-semibold text-sm">
          {/* Author image (if it exists) */}
          {authorImage && (
            <div className="relative rounded-full h-8 w-8 overflow-hidden mr-2">
              <Image
                src={`https:${authorImage.fields.file.url}`}
                layout="fill"
                objectFit="cover"
                quality={10}
                alt={authorName}
              />
            </div>
          )}

          {/* Author name */}
          <p className="mr-1 mb-0 font-heading">
            {authorName && `${authorName} -`}
          </p>

          {/* Article date */}
          <p className="mb-0 font-heading">{date}</p>
        </div>
      </section>

      {/* Article content */}
      <section className="pb-4 mb-8 border-b border-gray-200">
        {documentToReactComponents(articleContent, renderOptions)}
      </section>

      {/* Related articles */}
      <RelatedArticles articles={relatedArticles} />
    </article>
  );
}

// Render contentful embedded assets
const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};
