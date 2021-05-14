import ArticleSlider from "./ArticleSlider";

export default function RelatedArticles({ articles }) {
  return (
    <section>
      <h4 className="font-bold ">You might also like..</h4>
      <ArticleSlider articles={articles} related={true} />
    </section>
  );
}
