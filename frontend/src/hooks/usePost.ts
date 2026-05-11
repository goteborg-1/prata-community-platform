import type { Post } from "@shared";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import axios from "axios";

export function usePost(postId: string | undefined) {
  const [post, setPost] = useState<Post |null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if(!postId) return

    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const res = await api.get(`/posts/${postId}`)
        setPost(res.data.data)
        setError("")
      } catch (err) {
        if(axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Ett API-fel uppstod")
        } else {
          setError("Ett oväntat fel uppstod")
        }
        setPost(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  return { post, isLoading, error }
}