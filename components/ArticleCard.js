import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardVariants } from "../framer/variants";

export default function ArticleCard({ article, slider, featured, related }) {
  const { title, image, slug, category, authorName, authorImage } =
    article.fields;
  return (
    <motion.article
      className={`relative bg-black px-3 py-2 rounded shadow overflow-hidden ${
        featured ? "h-full" : "h-60"
      } ${slider ? "keen-slider__slide mb-2" : "mb-8"}`}
      variants={!featured && !slider && cardVariants}
      initial="initial"
      animate="enter"
    >
      <Link href={`/${category}/${slug}`}>
        <a>
          {/* Article thumbnail */}
          <Image
            src={`https:${image.fields.file.url}`}
            layout="fill"
            objectFit="cover"
            quality={30}
            className="opacity-80"
            alt={title}
          />

          {/* Title */}
          <h3
            className={`text-white text-xl  text-shadow capitalize relative tracking-wide font-bold ${
              !related && "md:text-2xl"
            }`}
          >
            {title}
          </h3>

          {/* Author name & image */}
          <div className="flex items-center font-semibold text-sm text-white absolute bottom-3 left-2">
            {authorImage && (
              <div className="relative rounded-full h-8 w-8 overflow-hidden mr-2">
                <Image
                  src={`https:${authorImage.fields.file.url}`}
                  layout="fill"
                  objectFit="cover"
                  quality={30}
                  alt={authorName}
                />
              </div>
            )}

            {/* Author name */}
            <p className="mr-1 mb-0 font-heading tracking-wider text-shadow">
              {authorName && `${authorName}`}
            </p>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
