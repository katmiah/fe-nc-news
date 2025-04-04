import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [vote, setVote] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [username, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setVote(articleResponse.data.article.votes);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  const handleIncrement = () => {
    setVote((currentVotes) => currentVotes + 1);
    updateVotes(1);
  };

  const handleDecrement = () => {
    setVote((currentVotes) => currentVotes - 1);
    updateVotes(-1);
  };

  const updateVotes = (voteChange) => {
    axios
      .patch(`https://nc-news-pidx.onrender.com/api/articles/${article_id}`, {
        inc_votes: voteChange,
      })
      .then((articleResponse) => {
        setVote(articleResponse.data.article.votes);
      })
      .catch((error) => {
        setError("Cannot update votes");
      });
  };

  const postComment = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    axios
      .post(
        `https://nc-news-pidx.onrender.com/api/articles/${article_id}/comments`,
        {
          username,
          body: newComment,
        }
      )
      .then((response) => {
        setComments((prevComments) => [response.data.comment, ...prevComments]);
        setNewComment("");
        setUserName("");
        alert("Comment posted. Thank you for contributing!");
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return <p>Currently Loading...</p>;
  }
  if (error) {
    return <p>Article does not not exist. {error}</p>;
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
      <p>Likes {vote}</p>
      <button onClick={handleIncrement}>Like</button>
      <button onClick={handleDecrement}>Dislike</button>

      <h4>Comments ({comments.length})</h4>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comments
              key={comment.comment_id}
              comments={[comment]}
              setComments={setComments}
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
      <form className="comment-form" onSubmit={postComment}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(element) => setUserName(element.target.value)}
          required
        />
        <label htmlFor="comment">Share Your Thoughts!</label>
        <input
          type="text"
          id="comment"
          value={newComment}
          onChange={(element) => setNewComment(element.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}

export default ArticlePage;
