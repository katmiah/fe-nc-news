function Comments({ comment }) {
  return (
    <div className="comment-box">
      <p>
        {comment.author} | {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <p>{comment.body}</p>
    </div>
  );
}
export default Comments;
