import Logo from "./Logo";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export default function Header({ navOpen, setNavOpen }) {
  const router = useRouter();

  // Toggle nav and clear search state
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };
  return (
    <header className="fixed z-10 w-full ">
      <div className="w-full bg-white shadow-sm">
        <section
          className={`h-14 md:h-20  flex items-center justify-between ${
            router.pathname === "/" ? "px-4 md:px-16" : "container max-w-7xl "
          }`}
        >
          {/* Logo */}
          <Logo />

          {/*Search Bar */}
          <section className="max-w-lg flex-1">
            <input type="text" />
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
    </header>
  );
}
