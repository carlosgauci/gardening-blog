import Head from "next/head";

export default function SEO({ title, image, desc }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      {title && <title>{title}</title>}
      {desc && <meta name="description" content={desc} />}
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      {image && <meta property="og:image" content={image} key="ogimage" />}
      {title && <meta property="og:title" content={title} key="ogtitle" />}
      {desc && <meta property="og:description" content={desc} key="ogdesc" />}
    </Head>
  );
}
