import Logo from "./Logo";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";

export default function Header() {
  const router = useRouter();
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
          <button className="text-gray-900 text-2xl ml-4 focus:outline-none">
            <BiMenu />
          </button>
        </section>
      </div>
    </header>
  );
}
