import { useQuery } from "@tanstack/react-query"
import { PostService } from "../../services/postService"

export default function PostFeed() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: PostService.getPosts
  })

  if(isLoading) return <p>Laddar inlägg...</p>
  if(error) return <p>Kunde inte ladda inlägg.</p>

  return(
    <section>
      {posts?.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </article>
      ))}
    </section>
  )
}