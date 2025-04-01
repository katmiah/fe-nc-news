import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);

    const fetchArticle = axios.get(
      `https://nc-news-pidx.onrender.com/api/articles/${article_id}`
    );
    const fetchComments = axios.get(
      `https://nc-news-pidx.onrender.com/api/articles/${article_id}/comments`
    );

    Promise.all([fetchArticle, fetchComments])
      .then(([articleResponse, commentsResponse]) => {
        setArticle(articleResponse.data.article);
        setComments(commentsResponse.data.comments);
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
  if (!article) {
    return <p>No article found.</p>;
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

      <h4>Comments ({comments.length})</h4>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comments key={comment.comment_id} comment={comment} />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
