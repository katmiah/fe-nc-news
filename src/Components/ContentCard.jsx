import { useNavigate } from "react-router-dom";

function ContentCard({ article }) {
  const navigate = useNavigate();

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
          <p>Likes {article.votes}</p>
          <img src={article.article_img_url} alt="Image for each article" />
          <p>Comments {article.comment_count}</p>
        </button>
      </li>
    </div>
  );
}
export default ContentCard;
