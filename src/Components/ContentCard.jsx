import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContentCard({ article }) {
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/articles/${article.article_id}`);
  };

  return (
    <div className="art-button">
      <li>
        <button onClick={handleClick} className="button" role="button">
          <p>{article.title}</p>
          <p>Let's dive into {article.topic}!</p>
          By {article.author} on{" "}
          {new Date(article.created_at).toLocaleDateString()}
          <p>Votes {article.votes}</p>
          <img src={article.article_img_url} alt="Image for each article" />
          <p>Comments {article.comment_count}</p>
        </button>
      </li>
    </div>
  );
}
export default ContentCard;
