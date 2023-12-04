import React from "react";
import "./Post.css";
import { formatISO9075 } from "date-fns";

function Post({ title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <img src={cover} alt={title} />
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
