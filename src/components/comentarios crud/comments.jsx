import { useState, useEffect } from "react";
import CommentForm from "./commentForm";
import Comment from "./comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from './ComponentComment.jsx';

const Comments = ({ commentsUrl, currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.PublicationDate).getTime() - new Date(b.PublicationDate).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = async(text, commentId) => {
  
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.CommentID === commentId) {
          return { ...backendComment, Content: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.CommentID !==  commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comentarios</h3>
      <div className="comment-form-title">Escribir un comentario</div>
      <CommentForm submitLabel="Escribir" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.CommentID}
            comment={rootComment}
            replies={getReplies(rootComment.CommentID)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;