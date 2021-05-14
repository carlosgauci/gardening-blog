import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ArticleCard from "./ArticleCard";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";

export default function ArticleSlider({ name, articles, related }) {
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1.2,
    spacing: 15,
    breakpoints: {
      "(min-width: 375px)": {
        slidesPerView: 1.5,
      },
      "(min-width: 640px)": {
        slidesPerView: 2.5,
      },
      "(min-width: 1024px)": {
        slidesPerView: 3.5,
      },
      "(min-width: 1440px)": {
        slidesPerView: 4.5,
      },
    },
    mode: "free",
  });

  // Resize slider when data changes
  useEffect(() => {
    if (slider) {
      slider.resize();
    }
  }, [articles, slider]);

  // Get category for "view all" link
  const category = articles[0].fields.category;

  return (
    <section className="mb-4 md:mb-6">
      {name && (
        <div className="px-4 md:px-16 mb-2 flex items-center justify-between md:justify-start">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider">
            {name}
          </h2>

          {/* View all link */}
          <Link href={`/${category}`}>
            <a className="ml-0 md:ml-6">
              <div className="flex items-center  text-green-500 font-bold">
                <p className="font-heading text-sm mb-0 flex-shrink-0">
                  view all
                </p>
                <BiChevronRight className="flex-shrink-0" />
              </div>
            </a>
          </Link>
        </div>
      )}

      {/* Slider */}
      <div
        ref={sliderRef}
        className={`keen-slider relative ${!related && "pl-4 md:pl-16"}`}
      >
        {articles.map((article) => (
          <ArticleCard key={article.sys.id} article={article} slider={true} />
        ))}
      </div>
    </section>
  );
}
