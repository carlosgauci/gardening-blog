import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { underlayVariants } from "../framer/variants";

export default function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchState, setSearchState] = useState({});

  // Get category data for nav/footer since we cant use getStaticProps in non-page components
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get("/api/get-categories");
      setCategories(result.data);
    };

    fetchCategories();
  }, []);

  // Close nav / searchbox when their underlay is clicked
  const handleUnderlayClick = () => {
    navOpen && setNavOpen(false);
    searchState.query && setSearchState({ ...searchState, query: "" });
  };

  return (
    <>
      {/* Header */}
      <Header
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        searchState={searchState}
        setSearchState={setSearchState}
      />

      {/* Main */}
      <main>{children}</main>

      {/* Navigation */}
      <AnimatePresence>
        {navOpen && (
          <Navigation setNavOpen={setNavOpen} categories={categories} />
        )}
      </AnimatePresence>

      {/* Underlay when nav / searchbox is open */}
      <AnimatePresence>
        {(navOpen || searchState.query) && (
          <motion.div
            className="fixed inset-0 bg-black"
            onClick={handleUnderlayClick}
            variants={underlayVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer categories={categories} />
    </>
  );
}
