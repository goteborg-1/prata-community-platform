import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth";
import { useMyLikedPosts, useMyPosts } from "../../hooks/useMyPosts";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import type { AvatarColor } from "@prata/shared";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import PostCard from "../../components/Posts/PostCard/PostCard";
import Avatar from "../../components/Avatar/Avatar";
import AvatarColorPicker from "../../components/Avatar/AvatarColorPicker";
import s from "./Profile.module.css"

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate: updateProfile } = useUpdateProfile()
  const [ activeTab, setActiveTab ] = useState<"posts" | "likes">("posts")

  const { data: myPosts, isLoading: loadingPosts } = useMyPosts()
  const { data: likedPosts, isLoading: loadingLikes } = useMyLikedPosts()

  if(!user) {
    navigate("/")
    return
  }

  const handleColorChange = (color: AvatarColor) => {
    updateProfile({ avatarColor: color })
  }

  const posts = activeTab === "posts" ? myPosts : likedPosts
  const isLoading = activeTab === "posts" ? loadingPosts : loadingLikes

  return(
    <Container>
      <Card center>
        <Avatar displayName={user.displayName!} color={user.avatarColor} size="large" />
        <AvatarColorPicker value={user.avatarColor} onChange={handleColorChange}/>
        <div className={s.userInfo}>
          <p className={s.displayName}>{user.displayName}</p>
          <p className={s.handle}>@{user?.handle}</p>
        </div>
      </Card>

      <div className={s.tabsWrapper}>
        <div className={s.tabs}>
          <button
            className={`${s.tab} ${activeTab === "posts" ? s.active : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Mina inlägg
          </button>
          <button
            className={`${s.tab} ${activeTab === "likes" ? s.active : ""}`}
            onClick={() => setActiveTab("likes")}
          >
            Gillade inlägg
          </button>
        </div>

        <div className={s.posts}>
          {isLoading && <p className={s.empty}>Laddar...</p>}
          {!isLoading && posts?.length === 0 && (
            <p className={s.empty}>
              {activeTab === "posts" ? "Du har inga inlägg än" : "Du har inte gillat några inlägg än"}
            </p>
          )}
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Container>
  )
}