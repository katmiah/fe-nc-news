function ContentCard({ article }) {
  const ArticleDate = ({ createdAt }) => {
    const reformattedDate = new Date(createdAt).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
    return <p>{reformattedDate}</p>;
  };

  return (
    <div>
      <li>
        <button class="button" role="button">
          <p>{article.title}</p>
          <p>Let's dive into {article.topic}!</p>
          <ArticleDate createdAt={article.created_at} />
          <p>Votes {article.votes}</p>
          <img src={article.article_img_url} alt="Image for each article" />
          <p>Comments {article.comment_count}</p>
        </button>
      </li>
    </div>
  );
}
export default ContentCard;
