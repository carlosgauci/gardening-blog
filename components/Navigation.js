import NavLinks from "../components/NavLinks";

export default function Navigation({ setNavOpen, categories }) {
  return (
    <nav className="fixed inset-0">
      <div className="absolute -inset-y-0 right-0 w-full md:w-96 bg-white">
        <NavLinks
          categories={categories}
          setNavOpen={setNavOpen}
          mainNav={true}
        />
      </div>

      {/* underlay */}
      <div
        className="absolute inset-0 bg-black opacity-70 -z-1"
        onClick={() => setNavOpen(false)}
      ></div>
    </nav>
  );
}
