import { api } from "../utils/api";
import type { Post } from "@shared";

interface ApiResponse<T> {
  status: string;
  data: T;
}

export const PostService = {
  getPosts: async () => {
    const { data } = await api.get<ApiResponse<Post[]>>("/posts")
    return data.data
  }
}