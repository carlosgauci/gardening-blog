import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-72 md:h-hero pt-14 md:pt-20 ">
      {/* Hero bg image */}
      <div className="absolute inset-x-0 bottom-0 top-14 md:top-20 overflow-hidden -z-1 bg-black">
        <Image
          src="/images/hero.jpg"
          layout="fill"
          objectFit="cover"
          quality={40}
          loading="eager"
          priority={true}
          className="opacity-70"
          alt="Pro Gardening banner"
        />
      </div>

      {/* Hero content */}
      <div className="py-8 px-2 h-full flex flex-col items-center justify-center text-white">
        {/* Hero title */}
        <section className="flex flex-col items-center mb-6 md:mb-10 text-shadow">
          <h1 className=" text-4xl md:text-7xl font-bold text-white">
            Pro Gardening
          </h1>
          <p className="font-heading font-bold self-end transform -translate-x-12 mb-0">
            by <span className="text-green-400">Farmer Joe</span>
          </p>
        </section>

        {/* Hero text */}
        <section className="max-w-xs md:max-w-xl flex flex-col items-center">
          <p className="text-center font-heading md:text-2xl text-shadow">
            Browse over 100+ hours of content related to gardening & farming.
          </p>
        </section>
      </div>
    </section>
  );
}
