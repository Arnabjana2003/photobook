import { AllPosts } from "../components";
import Container from "../components/Container";

function PostsPage() {
  return (
    <Container>
      <div className="flex flex-col">
        <AllPosts />
      </div>
    </Container>
  );
}

export default PostsPage;
