import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4  pl-4 pr-4 xl:pr-0 self-start md:sticky md:top-0">
      {/* Mailing list */}
      <section className=" bg-gray-900 text-white rounded px-4 py-8 mb-8 text-center ">
        <h4 className="uppercase tracking-widest font-bold text-white mb-5">
          Newsletter
        </h4>

        <NewsletterForm />
      </section>

      {/* Social media */}
      <section className="border border-gray-300 rounded px-4 py-8 mb-8 text-center ">
        <h4 className="uppercase tracking-widest font-bold mb-5">Follow Us</h4>
        <div className="flex flex-wrap justify-center text-2xl gap-4">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaPinterest />
        </div>
      </section>

      {/* Categories */}
      <section className="border border-gray-300 rounded px-4 py-8 mb-8 text-center ">
        <h4 className="uppercase tracking-widest font-bold mb-5">Categories</h4>
        <div className="flex flex-col justify-center">
          <p>Animal Husbandry</p>
          <p>Farming</p>
          <p>Gardening</p>
        </div>
      </section>
    </aside>
  );
}
