import CommentForm from "./commentForm";
import user from '../../img/imagenUsuario.png'

const Comment = ({comment, replies, setActiveComment, activeComment, updateComment, deleteComment, addComment, parentId = null, currentUserId,}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.CommentID &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.CommentID &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.PublicationDate) > fiveMinutes;
  const canDelete =  currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const AnsweredID = parentId ? parentId : comment.CommentID;
  const PublicationDate = new Date(comment.PublicationDate).toLocaleDateString();
  return (
    <div key={comment.CommentID} className="comment">
      <div className="comment-image-container">
        <img src={user}/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{PublicationDate}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.Content}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.Content}
            handleSubmit={(text) => updateComment(text, comment.CommentID)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.CommentID, type: "replying" })
              }
            >
              responder
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.CommentID, type: "editing" })
              }
            >
              Editar
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.CommentID)}
            >
              eliminar
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, AnsweredID)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.CommentID}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.CommentID}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;