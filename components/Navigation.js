import NavLinks from "../components/NavLinks";
import { motion } from "framer-motion";
import { navVariants } from "../framer/variants";

export default function Navigation({ setNavOpen, categories }) {
  return (
    <motion.nav
      className="fixed z-10 -inset-y-0 right-0 w-full md:w-96 bg-white"
      variants={navVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <NavLinks
        categories={categories}
        setNavOpen={setNavOpen}
        mainNav={true}
      />
    </motion.nav>
  );
}
