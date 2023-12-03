import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "script",
  ];

  const titleSetHandler = (event) => {
    setTitle(event.target.value);
  };

  const summarySetHandler = (event) => {
    setSummary(event.target.value);
  };

  const contentSetHandler = (event) => {
    setContent(event);
  };

  return (
    <form>
      <input type="text" placeholder="Title" onChange={titleSetHandler} />
      <input type="text" placeholder="Summary" onChange={summarySetHandler} />
      <input type="file" />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={contentSetHandler}
      />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}

export default PostPage;
