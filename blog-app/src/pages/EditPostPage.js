import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { usePostPage } from "../adapter/usePostPage";

function EditPostPage() {
  const { id } = useParams();
  const { postInfo, editPost, isEdited } = usePostPage();
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [content, setContent] = useState();
  const [files, setFiles] = useState();

  function editPostHandler(event) {
    event.preventDefault();
    editPost(title, summary, content, files);
  }
  const titleSetHandler = (event) => {
    setTitle(event.target.value);
  };

  const summarySetHandler = (event) => {
    setSummary(event.target.value);
  };

  const fileSetHandler = (event) => {
    setFiles(event.target.files);
  };

  const contentSetHandler = (event) => {
    setContent(event);
  };

  if (isEdited) {
    return <Navigate to={`/post/${id}`} />;
  }

  if (!postInfo) {
    return <></>;
  }
  return (
    <form onSubmit={editPostHandler}>
      <input
        type="text"
        placeholder="Title"
        value={title ?? postInfo.title}
        onChange={titleSetHandler}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary ?? postInfo.summary}
        onChange={summarySetHandler}
      />
      <input type="file" onChange={fileSetHandler} />
      <Editor
        value={content ?? postInfo.content}
        onChange={contentSetHandler}
      />
      <button style={{ marginTop: "5px", cursor: "pointer" }}>Edit Post</button>
    </form>
  );
}

export default EditPostPage;
