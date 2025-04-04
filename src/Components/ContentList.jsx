import { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "./ContentCard.jsx";
import { useSearchParams } from "react-router";

function ContentList() {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    axios
      .get("https://nc-news-pidx.onrender.com/api/articles", {
        params: { sort_by: sortBy, order },
      })
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(true);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortBy, order]);

  const handleSortChange = (event) => {
    setSearchParams({ sort_by: event.target.value, order });
  };

  const handleOrderChange = () => {
    setSearchParams({
      sort_by: sortBy,
      order: order === "asc" ? "desc" : "asc",
    });
  };

  if (isLoading) {
    return <p> Currently Loading... </p>;
  }
  if (error) {
    return <p>Something went wrong! {error}</p>;
  }

  return (
    <div>
      <h3>Frontpage</h3>

      <form className="filter-form">
        <label>Sort by:</label>
        <select name={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Amount of comments</option>
          <option value="votes">Likes</option>
        </select>
      </form>

      <button onClick={handleOrderChange}>
        Order: {order === "asc" ? "Ascending" : "Descending"}
      </button>

      <ul>
        {articles.map((article) => {
          return <ContentCard key={article.article_id} article={article} />;
        })}
      </ul>
    </div>
  );
}

export default ContentList;
