import Link from "next/link";

export default function NavLinks({
  categories,
  footer,
  mainNav,
  sidebar,
  setNavOpen,
}) {
  return (
    <ul
      className={`flex text-center justify-center items-center ${
        footer
          ? "flex-wrap text-white text-xs gap-x-8 gap-y-4 font-heading tracking-widest"
          : "flex-col h-full font-body"
      } ${mainNav && "pt-14 md:pt-20 text-2xl font-semibold gap-4"} ${
        sidebar && "text-md gap-y-2"
      } `}
    >
      {!sidebar && (
        <li>
          <Link href="/">
            <a onClick={footer ? undefined : () => setNavOpen(false)}>Home</a>
          </Link>
        </li>
      )}

      {categories.map((cat) => (
        <li key={cat.slug || cat.fields.slug}>
          <Link href={`/${cat.slug || cat.fields.slug}`}>
            <a onClick={mainNav ? () => setNavOpen(false) : undefined}>
              {cat.name || cat.fields.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
