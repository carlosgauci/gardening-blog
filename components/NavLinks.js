import Link from "next/link";

export default function NavLinks({ categories, footer, setNavOpen }) {
  return (
    <ul
      className={`flex text-center justify-center items-center ${
        footer
          ? "flex-wrap text-white text-xs gap-x-8 gap-y-4 font-heading tracking-widest"
          : "flex-col h-full text-2xl font-body gap-4 font-semibold pt-14 md:pt-20"
      } `}
    >
      <li>
        <Link href="/">
          <a onClick={footer ? undefined : () => setNavOpen(false)}>Home</a>
        </Link>
      </li>

      {categories.map((cat) => (
        <li key={cat.slug}>
          <Link href={`/${cat.slug}`}>
            <a onClick={footer ? undefined : () => setNavOpen(false)}>
              {cat.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
