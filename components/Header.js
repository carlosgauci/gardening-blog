import Logo from "./Logo";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  connectStateResults,
} from "react-instantsearch-dom";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { searchboxVariants } from "../framer/variants";

// Algolia client
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

export default function Header({
  navOpen,
  setNavOpen,
  searchState,
  setSearchState,
}) {
  const router = useRouter();

  // Toggle nav and clear search state
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
    setSearchState({ ...searchState, query: "" });
  };

  // Close the nav if its open and we start searching
  useEffect(() => {
    searchState.query && navOpen && setNavOpen(false);
  }, [searchState.query, navOpen]);

  // Clear search state if we navigate
  useEffect(() => {
    setSearchState({ ...searchState, query: "" });
  }, [router.asPath]);

  return (
    <InstantSearch
      searchClient={client}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      searchState={searchState}
      onSearchStateChange={setSearchState}
    >
      <header className="fixed z-20 w-full ">
        <div className="w-full bg-white shadow-sm">
          <section
            className={`h-14 md:h-20  flex items-center justify-between ${
              router.pathname === "/" ? "px-4 md:px-16" : "container max-w-7xl "
            }`}
          >
            {/* Logo */}
            <Logo />

            {/* Algolia search bar */}
            <section className="max-w-lg flex-1">
              <SearchBox
                translations={{
                  placeholder: "Search content...",
                }}
              />
            </section>

            {/* Nav toggle icon */}
            <button
              onClick={handleNavToggle}
              className="text-gray-900 text-2xl ml-4 focus:outline-none"
            >
              {navOpen ? <IoClose /> : <BiMenu />}
            </button>
          </section>
        </div>

        {/* Search results box */}
        <Results>
          <motion.section
            className="fixed left-1/2  container py-4 max-w-full md:max-w-lg max-h-96 bg-white rounded-b-md shadow-md overflow-y-auto"
            variants={searchboxVariants}
            initial="initial"
            animate="enter"
          >
            <p>Showing results for "{searchState.query}".</p>
            <Hits hitComponent={Article} />
            <Pagination
              showFirst={false}
              showPrevious={false}
              showNext={false}
              totalPages={6}
              className="flex justify-center mt-4"
            />
          </motion.section>
        </Results>
      </header>
    </InstantSearch>
  );
}

// Search results component
const Results = connectStateResults(
  ({ searchState, searchResults, children }) => {
    // Show children if we have a search query and results were found
    if (searchState.query) {
      if (searchResults && searchResults.nbHits !== 0) {
        return children;
      } else {
        return (
          // Show a message if we have a search query and no results were found
          <div className="fixed left-1/2 transform -translate-x-1/2 container bg-white max-w-full rounded-b-md md:max-w-lg py-2">
            <p>No results found for "{searchState.query}"</p>
          </div>
        );
      }

      // Show nothing if no search query is entered
    } else {
      return null;
    }
  }
);

// Results article card
const Article = ({ hit }) => {
  const { title, slug, image, category } = hit;
  return (
    <div
      className={`relative h-40 w-full bg-black px-2 py-1 rounded-md shadow-md overflow-hidden 
      `}
    >
      <Link href={`/${category}/${slug}`}>
        <a className="w-full">
          {/* Article thumbnail */}
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            quality={10}
            className="opacity-80"
            alt={title}
          />

          {/* Title */}
          <h3 className="text-white text-xl text-shadow capitalize z-10 relative">
            {title}
          </h3>
        </a>
      </Link>
    </div>
  );
};
