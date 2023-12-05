import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import { formatISO9075 } from "date-fns";

function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt={title} />{" "}
        </Link>
      </div>
      <div className="text">
        <Link to={`post/${_id}`}>
          <h2>{title}</h2>
        </Link>
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
