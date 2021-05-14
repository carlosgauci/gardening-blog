import NewsletterForm from "./NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="w-full relative py-20 mt-8 bg-green-400">
      <div className="container flex flex-col items-center text-center z-10 relative">
        <h2 className="text-3xl font-bold mb-3 ">Join Our Newsletter</h2>
        <p className="mb-3 font-heading text-sm">
          Get notified about new content & updates!
        </p>
        <NewsletterForm index={true} />
      </div>
    </section>
  );
}
