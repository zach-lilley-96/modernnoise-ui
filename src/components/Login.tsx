export default function LoginButton(){
    const login = () => {
    window.location.href =
      `${import.meta.env.VITE_API_BASE_URI}oauth2/authorization/google`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "1rem",
      }}
    >
      <button
        onClick={login}
        type="button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 1rem",
          borderRadius: "9999px",
          border: "1px solid rgba(0,0,0,0.12)",
          background: "#fff",
          color: "rgba(0,0,0,0.86)",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        }}
        aria-label="Sign in with Google"
      >
        <span
          aria-hidden="true"
          style={{
            width: 20,
            height: 20,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Google "G" (multi-color) */}
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.2 13.1 17.6 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.7c-.6 3-2.3 5.6-4.9 7.3l7.5 5.8c4.4-4.1 7.2-10.1 7.2-17.8z"
            />
            <path
              fill="#FBBC05"
              d="M10.5 28.6c-1-3-1-6.2 0-9.2l-7.9-6.1C-.9 18.6-.9 29.4 2.6 34.7l7.9-6.1z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.8 2.2-7.7 2.2-6.4 0-11.8-3.6-13.5-9l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
            />
          </svg>
        </span>

        <span>Sign in with Google</span>
      </button>
    </div>
  );
}