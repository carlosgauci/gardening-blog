import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  const { title, image, slug, articleText, category } = article.fields;
  return (
    <article
      className={`relative bg-black px-2 py-1 rounded shadow overflow-hidden h-full`}
    >
      <Link href={`/${category}/${slug}`}>
        <a>
          {/* Article thumbnail */}
          <Image
            src={`https:${image.fields.file.url}`}
            layout="fill"
            objectFit="cover"
            quality={10}
            className="opacity-80"
            alt={title}
          />

          {/* Title */}
          <h3 className="text-white text-xl text-shadow capitalize relative">
            {title}
          </h3>
        </a>
      </Link>
    </article>
  );
}
