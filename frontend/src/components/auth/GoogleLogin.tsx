import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { api } from "../../utils/api";
import { useNavigate } from "react-router";

export default function GoogleLoginWindow() {
  const navigate = useNavigate()

  async function handleSucces(response: CredentialResponse) {
    const {data} = await api.post("/users/google", { idToken: response.credential })

    console.log(data.data)
    // make sure user stays signed in. found in here i think? -> "users.controller { expiresIn: "7d" }"
    localStorage.setItem("token", data.data.token)
    localStorage.setItem("user", JSON.stringify(data.data.user))
    navigate("/success")
  }

  return (
    <GoogleLogin 
      onSuccess={handleSucces} 
      onError={() => console.log("Login failed")}
      shape="pill"
      text="continue_with"
    />
  )
}