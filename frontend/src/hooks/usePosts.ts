import { useQuery } from "@tanstack/react-query";
import { type Post, type GetPostsQuery } from "@shared";
import { api } from "../utils/api";


export function usePosts(queryParams: GetPostsQuery = {}) {
  return useQuery({
    queryKey: ["posts", queryParams],
    queryFn: async () => {
      const res = await api.get("/posts", {params: queryParams})
      return res.data.data as Post[]
    }
  })
}