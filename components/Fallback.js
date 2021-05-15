import React from "react";

// Fallback / skeleton page
export default function Fallback({ categories }) {
  return (
    <div className="pt-14 md:pt-20 xl:container xl:max-w-7xl">
      {/* Fallback image */}
      <div className="relative w-full mb-8 h-72 md:h-featured xl:rounded-b-m bg-gray-300 overflow-hidden"></div>

      {/* Fallback content */}
      <section className="md:flex relative">
        <div className="w-full md:w-2/3 lg:w-3/4 px-4 xl:pl-0 xl:pr-8">
          <div className="h-8 w-96 mb-2 bg-gray-300"></div>
          <div className="h-8 w-40 mb-4 bg-gray-300"></div>
          <div className="h-56 w-full mb-4 bg-gray-300"></div>
          <div className="h-56 w-full mb-4 bg-gray-300"></div>
        </div>

        {/* Fallback sidebar */}
        <section className="flex flex-col w-full md:w-1/3 lg:w-1/4  pl-4 pr-4 xl:pr-0 self-start md:sticky md:top-28">
          <div className="h-72 bg-gray-300 mb-4"></div>
          <div className="h-72 bg-gray-300 mb-4"></div>
        </section>
      </section>
    </div>
  );
}
