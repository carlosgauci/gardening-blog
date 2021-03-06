import { useRouter } from "next/router";
import NavLinks from "./NavLinks";

export default function Footer({ categories }) {
  const router = useRouter();
  return (
    <footer className="bg-gray-900">
      <div
        className={`flex flex-col-reverse items-center md:flex-row justify-between py-8 ${
          router.pathname === "/" ? "px-4 md:px-16" : "container max-w-7xl"
        }`}
      >
        {/* Nav section */}
        <nav className="mt-6 md:mt-0">
          <NavLinks footer={true} categories={categories} />
        </nav>

        {/* Contact section */}
        <section>
          <ul className="text-white font-heading text-xs tracking-widest text-center md:text-right">
            <li className="mb-0.5">Pro Gardening © Copyright 2021</li>
            <li>farmerjoe@gardening</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
