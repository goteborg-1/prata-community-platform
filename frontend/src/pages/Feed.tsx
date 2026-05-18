import { useFeedFilter } from "../context/useFeedFilter"
import { usePosts } from "../hooks/usePosts"
import { useAuth } from "../context/useAuth"
import Container from "../components/Container/Container"
import CreatePost from "../components/Posts/CreatePost/CreatePost"
import FeedFilter from "../components/FeedFilter/FeedFilter"
import PostCard from "../components/Posts/PostCard/PostCard"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

export default function Feed() {
  const { queryParams } = useFeedFilter()
  const { data, isLoading } = usePosts(queryParams)
  const { isLoggedIn } = useAuth()

  const posts = data?.data

  return(
    <Container>
      { isLoggedIn && <CreatePost />}

      <FeedFilter />

      {isLoading ? <LoadingSpinner text="Laddar inlägg" /> : (
        posts && posts.length ? posts?.map(post => <PostCard key={post.id} post={post} />) : <p>Inga inlägg hittades</p>
      )}

      {/* TODO: Add pagination */}
    </Container>
  )
}