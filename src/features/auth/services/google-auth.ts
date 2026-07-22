import api from "@/shared/lib/axios";

type GoogleLoginSource = "user" | "manager";

function getCallbackUrl(source: GoogleLoginSource) {
  const url = new URL("/auth/google/callback", window.location.origin);
  url.searchParams.set("source", source);
  return url.toString();
}

export async function startGoogleLogin(source: GoogleLoginSource = "user") {
  const errorPath = source === "manager" ? "/manager/login" : "/login";

  const res = await api.post("/api/auth/sign-in/social", {
    provider: "google",
    callbackURL: getCallbackUrl(source),
    errorCallbackURL: `${window.location.origin}${errorPath}`,
    disableRedirect: true,
  });

  if (res.data?.url) {
    window.location.href = res.data.url;
  }
}

export async function getSocialSession() {
  const res = await api.post("/api/auth/social-session");
  return res.data;
}
