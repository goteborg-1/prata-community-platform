import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export default function Login() {
  async function handleSucces(response: CredentialResponse) {
    const res = await fetch("http://localhost:3000/api/v1/users/google", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ idToken: response.credential })
    })
    const data = await res.json()
    console.log(data)
    // make sure user stays signed in. found in here i think? -> "users.controller { expiresIn: "7d" }"
    localStorage.setItem("token", data.token)
  }

  return (
    <div>
      <h1>Login pls</h1>
      <GoogleLogin onSuccess={handleSucces} onError={() => console.log("Login failed")}></GoogleLogin>
    </div>
  )
}