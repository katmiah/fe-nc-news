import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticlePage from "./ArticlePage";

function Topics() {
  const { topicName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <li key={article.article_id}>
                <a href={`/articles/${article.article_id}`}>{article.title}</a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default Topics;
