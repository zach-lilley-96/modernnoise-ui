export default function LoginButton(){
    const login = () => {
    window.location.href =
      `${import.meta.env.VITE_API_BASE_URI}oauth2/authorization/google`;
  };

  return (
    <button onClick={login}>
      Sign in with Google
    </button>
  );
}