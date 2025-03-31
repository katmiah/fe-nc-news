import { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "./ContentCard.jsx";

function ContentList() {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://nc-news-pidx.onrender.com/api/articles")
      .then((response) => {
        console.log(response.data);
        setArticles(response.data.articles);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p> Currently Loading... </p>;
  }

  return (
    <div>
      <h3>Frontpage</h3>
      <ul>
        {articles.map((article) => {
          return <ContentCard key={article.article_id} article={article} />;
        })}
      </ul>
    </div>
  );
}

export default ContentList;
