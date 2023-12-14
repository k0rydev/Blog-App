import Post from "../components/Post";
import { usePosts } from "../adapter/usePosts";

function IndexPage() {
  const { posts } = usePosts();

  return (
    <>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </>
  );
}

export default IndexPage;
