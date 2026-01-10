export default function LoginButton(){
    const login = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <button onClick={login}>
      Sign in with Google
    </button>
  );
}