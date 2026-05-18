import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts.api";
import { type GetPostsQuery } from "@shared";

export function usePosts(queryParams: GetPostsQuery = {sort: "newest", page: 1, limit: 5}) {
  return useQuery({
    queryKey: ["posts", queryParams],
    queryFn: () => getPosts(queryParams),
    placeholderData: (previousData) => previousData,
  })
}