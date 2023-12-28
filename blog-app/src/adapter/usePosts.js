import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((post) => {
        setPosts(post);
      });
    });
  }, []);

  return { posts };
}
