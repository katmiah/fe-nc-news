import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticlePage from "./ArticlePage";
import { Navigate } from "react-router";

function Topics() {
  const { topicName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://nc-news-pidx.onrender.com/api/articles?topic=${topicName}`)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the articles", error);
        setError("Error fetching the articles. Please try again later.");
        setLoading(false);
      });
  }, [topicName]);

  const handleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  if (loading) {
    return <p>Currently loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="article_header">Articles on {topicName}</h2>

      {articles.length === 0 ? (
        <p>No articles available to this topic yet.</p>
      ) : (
        <ul className="topic_list">
          {articles.map((article) => {
            return (
              <div className="art-button" key={article.article_id}>
                <li>
                  <button
                    onClick={() => handleClick(article.article_id)}
                    className="button"
                    role="button"
                  >
                    <p>{article.title}</p>
                    <p>Let's dive into {article.topic}!</p>
                    By {article.author} on{" "}
                    {new Date(article.created_at).toLocaleDateString()}
                    <p>Likes {article.votes}</p>
                    <img
                      className="img"
                      src={article.article_img_url}
                      alt="Image for each article"
                    />
                    <p>Comments {article.comment_count}</p>
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default Topics;
