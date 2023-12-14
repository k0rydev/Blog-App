import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function usePostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  const deletePost = async () => {
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    if (response.ok) {
      setIsDeleted(true);
    }
  };

  const editPost = async (title, summary, content, files) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setIsEdited(true);
    }
  };

  return {
    postInfo,
    deletePost,
    editPost,
    isDeleted,
    isEdited,
  };
}
