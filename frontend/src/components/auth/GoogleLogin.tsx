import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function GoogleLoginWindow() {
  const { handleAuthSuccess } = useAuth()
  const navigate = useNavigate()

  async function handleSucces(response: CredentialResponse) {
    const {data} = await api.post("/users/google", { idToken: response.credential })

    handleAuthSuccess(data.data.token, data.data.user)
    navigate("/")
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