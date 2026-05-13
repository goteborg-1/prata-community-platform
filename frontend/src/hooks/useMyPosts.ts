import { useQuery } from "@tanstack/react-query";
import { getMyLikedPosts, getMyPosts } from "../api/profile.api";

export function useMyPosts() {
  return useQuery({
    queryKey: ["profile", "posts"],
    queryFn: getMyPosts,
  })
}

export function useMyLikedPosts() {
  return useQuery({
    queryKey: ["profile", "likes"],
    queryFn: getMyLikedPosts
  })
}