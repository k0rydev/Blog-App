export function useCreatePost() {
  const createPost = async (title, summary, content, files) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files?.[0]);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    switch (response.status) {
      case 200:
        break;
      case 400:
        alert("Title, summary and content can not be empty");
        break;
      case 401:
        alert("Cover can not be empty");
        break;
      default:
        alert("Unkown error! Please report back to devs");
    }
    return response.status;
  };
  return { createPost };
}
