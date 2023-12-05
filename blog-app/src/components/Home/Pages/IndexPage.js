import React, { useEffect, useState } from "react";
import Post from "../Post";

function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </>
  );
}

export default IndexPage;
