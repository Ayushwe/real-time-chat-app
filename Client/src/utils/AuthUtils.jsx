export function getToken() {
  return localStorage.getItem("authToken");
}

export function saveToken(token) {
  localStorage.setItem("authToken", token);
}

export function removeToken() {
  localStorage.removeItem("authToken");
}
