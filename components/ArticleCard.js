import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article, slider, featured }) {
  const { title, image, slug, category } = article.fields;
  return (
    <article
      className={`relative bg-black px-2 py-1 rounded shadow overflow-hidden ${
        featured ? "h-full" : "h-60"
      } ${slider ? "keen-slider__slide mb-2" : "mb-8"}`}
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
          <h3 className="text-white text-xl text-shadow capitalize relative tracking-wide font-bold">
            {title}
          </h3>
        </a>
      </Link>
    </article>
  );
}
