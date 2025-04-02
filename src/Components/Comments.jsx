import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Comments({ comments = [], setComments }) {
  const [error, setError] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log("hello");
  });

  const deleteComment = (commentId) => {
    setIsDeleting(true);

    axios
      .delete(`https://nc-news-pidx.onrender.com/api/comments/${commentId}`)
      .then(() => {
        console.log(`Deleted comment with ID: ${commentId}`);

        setComments((prevComments) => {
          const updatedComments = prevComments.filter(
            (comment) => comment.comment_id !== commentId
          );
          return updatedComments;
        });

        setIsDeleting(false);
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
        setError("Error deleting comment");
        setIsDeleting(false);
      });
  };

  return (
    <div className="comment-box">
      {comments.length ? (
        comments.map((comment) => (
          <div key={comment.comment_id}>
            <p>
              {comment.author} |{" "}
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
            <p>{comment.body}</p>
            <button
              onClick={() => deleteComment(comment.comment_id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Comments;
