import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://nc-news-pidx.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p> Currently Loading... </p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="article-content">
      <h1>{article.title}</h1>
      <p>
        By {article.author} on{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <img src={article.article_img_url} alt="Image for each article" />
      <p>{article.body}</p>
      <p>Votes {article.votes}</p>
      <p>Comments {article.comment_count}</p>
    </div>
  );
}
export default ArticlePage;
