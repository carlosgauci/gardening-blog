import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Get category data for nav/footer since we cant use getStaticProps in non-page components
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get("/api/get-categories");
      setCategories(result.data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main>{children}</main>
      {navOpen && (
        <Navigation setNavOpen={setNavOpen} categories={categories} />
      )}
      <Footer />
    </>
  );
}
